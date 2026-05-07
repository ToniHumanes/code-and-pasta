const { MAX_DIFF_CHARS } = require("./pr-review.config");
const { openAiApiKey } = require("./pr-review.vars");

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-4.1-mini";
const REVIEW_INSTRUCTIONS = `
You are a senior frontend engineer reviewing a Docusaurus blog pull request.

Focus on:
- MDX structure
- frontmatter
- SEO
- content clarity
- React/TypeScript risks
- performance implications
- accessibility issues
- potential build-breaking changes
- code quality and maintainability

Classify every finding with one severity:
- high: can break build, navigation, metadata, SEO indexing, or production behavior
- medium: quality issue worth fixing before merge
- low: small improvement or optional suggestion

Rules:
- Max 5 findings
- Be concise
- Be specific and actionable
- Do not rewrite full posts
- Do not invent files or changes
- If everything looks good, say "No relevant issues found."
- Output grouped by severity: High, Medium, Low

Posts inside the /blog directory must include:
- title
- description
- image
- tags
- authors
- date in frontmatter or filename

Post rules:
- Tags must exist in tags.yml.
- Missing image is high severity.
- Missing description is high severity.
- Missing tags is high severity.
- Missing authors is high severity.
- Missing title is high severity.
- Missing date in both frontmatter and filename is high severity.
- If the text is generic, repetitive, over-polished, or lacks specific examples, classify it as medium.

For technical posts:
- Check whether the feature/concept is described correctly.
- Flag potential technical inaccuracies.
- Flag implementation risks or missing trade-offs.
`;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return Boolean(value) && typeof value === "object";
}

/**
 * @param {Record<string, unknown>} responseBody
 * @returns {string | null}
 */
function getOutputText(responseBody) {
  if (
    "output_text" in responseBody &&
    typeof responseBody.output_text === "string"
  ) {
    return responseBody.output_text;
  }

  return null;
}

/**
 * @param {Record<string, unknown>} responseBody
 * @returns {string | null}
 */
function getNestedOutputText(responseBody) {
  if (!Array.isArray(responseBody.output)) {
    return null;
  }

  const textParts = responseBody.output.flatMap((outputItem) => {
    if (!isRecord(outputItem) || !Array.isArray(outputItem.content)) {
      return [];
    }

    return outputItem.content.flatMap((contentItem) => {
      if (!isRecord(contentItem)) {
        return [];
      }

      if (!("text" in contentItem) || typeof contentItem.text !== "string") {
        return [];
      }

      return [contentItem.text];
    });
  });

  if (!textParts.length) {
    return null;
  }

  return textParts.join("\n");
}

/**
 * @param {unknown} responseBody
 * @returns {string}
 */
function getResponseText(responseBody) {
  if (!isRecord(responseBody)) {
    throw new Error("OpenAI response body was not an object.");
  }

  const outputText = getOutputText(responseBody);
  if (outputText) {
    return outputText;
  }

  const nestedOutputText = getNestedOutputText(responseBody);
  if (nestedOutputText) {
    return nestedOutputText;
  }

  throw new Error(
    `OpenAI response did not include text output. Response keys: ${Object.keys(responseBody).join(", ")}`,
  );
}

/**
 * @param {string} input
 * @returns {Promise<string>}
 */
async function getOpenAIResponse(input) {
  const response = await fetch(OPENAI_RESPONSES_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${openAiApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      instructions: REVIEW_INSTRUCTIONS,
      input,
    }),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(
      `OpenAI API error: ${response.status} ${JSON.stringify(responseBody)}`,
    );
  }

  return getResponseText(responseBody);
}

/**
 * @param {string} diff
 */
async function analyzeDiffWithAI(diff) {
  const trimmedDiff = diff.slice(0, MAX_DIFF_CHARS);

  return getOpenAIResponse(`
Review this PR diff:

${trimmedDiff}
`);
}

module.exports = {
  analyzeDiffWithAI,
};

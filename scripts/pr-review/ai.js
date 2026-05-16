const { MAX_DIFF_CHARS } = require("./pr-review.config");
const { openAiApiKey } = require("./pr-review.vars");

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-5.4-mini";
const REVIEW_INSTRUCTIONS = `
You are an editor reviewing a Docusaurus blog post pull request.

Focus on:
- SEO title and description quality
- language quality, grammar, and natural phrasing
- content clarity
- specificity, examples, repetition, and tone
- reader value and clear takeaways
- intro and conclusion quality
- heading structure and section flow
- internal consistency between title, description, tags, and body
- publishing risks
- technical accuracy only when the post makes technical claims

Classify every finding with one severity:
- high: demonstrably creates a serious publication risk that is not covered by automated checks
- medium: quality issue worth fixing before merge
- low: small improvement or optional suggestion

Rules:
- Max 5 findings
- Only report actual errors or clearly actionable issues supported by the diff.
- Be concise
- Be specific and actionable
- Do not rewrite full posts
- Do not give vague feedback like "improve clarity" without naming the specific section, sentence, or issue
- Do not invent files or changes
- Do not escalate consistency preferences, style preferences, or "please confirm" checks to high severity.
- Do not ask the author to confirm something unless the diff gives concrete evidence that it is wrong.
- If everything looks good, say "No relevant issues found."
- Output grouped by severity: High, Medium, Low

Automated checks already verify:
- required frontmatter fields exist: title, description, image, tags
- the frontmatter image file exists
- tags are defined in tags.yml
- the post includes <!-- truncate -->

Do not report those automated checks again.

AI-only review rules:
- Weak, generic, or unclear title/description is medium severity.
- Generic, repetitive, over-polished text or lack of specific examples is medium severity.
- Mixed Spanish and English is medium severity when it looks accidental or hurts readability.
- A weak intro that delays the problem, context, or promise of the post is medium severity.
- A weak conclusion that does not close with a clear idea, lesson, or takeaway is medium severity.
- Flag contradictions between the title, description, tags, and body.

For technical posts:
- Check whether the feature, concept, or claim is described correctly.
- Flag potential technical inaccuracies.
- Flag missing context or trade-offs when they affect reader understanding.
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
      reasoning: {
        effort: "low",
      },
      text: {
        verbosity: "low",
      },
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

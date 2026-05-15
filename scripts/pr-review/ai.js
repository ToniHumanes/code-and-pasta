const { MAX_DIFF_CHARS } = require("./pr-review.config");
const { openAiApiKey } = require("./pr-review.vars");

const OPENAI_RESPONSES_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-5.4-mini";
const REVIEW_INSTRUCTIONS = `
You are an editor reviewing a Docusaurus blog post pull request.

Focus on:
- Markdown post structure
- frontmatter completeness
- Docusaurus blog compatibility
- SEO title and description quality
- language quality, grammar, and natural phrasing
- content clarity
- specificity, examples, repetition, and tone
- reader value and clear takeaways
- intro and conclusion quality
- heading structure and section flow
- internal consistency between title, description, tags, and body
- image and asset path plausibility
- truncate marker placement
- publishing risks
- technical accuracy only when the post makes technical claims

Classify every finding with one severity:
- high: demonstrably breaks Docusaurus blog rendering, required metadata, SEO indexing, or publication
- medium: quality issue worth fixing before merge
- low: small improvement or optional suggestion

Rules:
- Max 5 findings
- Only report actual errors or clearly actionable issues supported by the diff.
- Do not report a required frontmatter field as missing when it is present.
- Be concise
- Be specific and actionable
- Do not rewrite full posts
- Do not give vague feedback like "improve clarity" without naming the specific section, sentence, or issue
- Do not invent files or changes
- Do not flag commented-out frontmatter placeholders unless they create a concrete publishing problem.
- Do not escalate consistency preferences, style preferences, or "please confirm" checks to high severity.
- Do not ask the author to confirm something unless the diff gives concrete evidence that it is wrong.
- If everything looks good, say "No relevant issues found."
- Output grouped by severity: High, Medium, Low

Posts inside the /blog directory must include:
- authors
- title
- description
- image
- tags
- date in frontmatter or filename. Docusaurus supports extracting the date from the filename.

Non-findings:
- A missing frontmatter date is not an issue when the blog filename starts with YYYY-MM-DD.
- A relative blog image path such as ./img/name.webp is not an issue when it matches established blog image conventions.
- A matching frontmatter image and Markdown image path is not an issue when the path is plausible for this repository.
- Do not report hypothetical path problems such as "could be problematic" without a concrete mismatch, missing file evidence, or repo convention conflict.

Post rules:
- Tags must exist in tags.yml.
- Missing image is high severity.
- Treat image as present when the frontmatter includes a non-empty image key.
- Do not flag an existing image as invalid unless the path is clearly broken or implausible for this repository.
- Do not flag image paths when the frontmatter image and Markdown image match and the path looks plausible.
- Missing description is high severity.
- Treat description as present when the frontmatter includes a non-empty description key.
- Do not flag an existing description as inadequate unless it is generic, unclear, or inconsistent with the post content.
- Missing tags is high severity.
- Missing authors is high severity.
- Treat authors as present when the frontmatter includes an authors key, including a single global author id such as authors: antoniohumanes.
- Do not require inline author details when authors references a global author id from authors.yml.
- Missing title is high severity.
- Missing date in both frontmatter and filename is high severity.
- Do not flag a missing frontmatter date when the filename already includes a YYYY-MM-DD date.
- Missing or badly placed <!-- truncate --> marker is medium severity.
- Image paths should look valid for this repository, usually ./img/... or @site/blog/img/... for blog images and /img/... for static images.
- If draft: true exists, do not classify polish-only issues as high severity unless they can break the post.
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

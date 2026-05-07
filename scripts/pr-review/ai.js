const OpenAI = require("openai").default;
const { MAX_DIFF_CHARS } = require("./pr-review.config");
const { openAiApiKey } = require("./pr-review.vars");

const openai = new OpenAI({
  apiKey: openAiApiKey,
});

/**
 * @param {string} diff
 */
async function analyzeDiffWithAI(diff) {
  const trimmedDiff = diff.slice(0, MAX_DIFF_CHARS);

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    instructions: `
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
`,
    input: `
Review this PR diff:

${trimmedDiff}
`,
  });

  return response.output_text;
}

module.exports = {
  analyzeDiffWithAI,
};

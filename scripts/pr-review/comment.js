const { MAX_DIFF_CHARS } = require("./pr-review.config");

/**
 * @typedef {Object} BuildCommentOptions
 * @property {null | string} analysis
 * @property {number} diffLength
 * @property {string} [skippedReason]
 * @property {{ filename: string }[]} [relevantFiles]
 */

/**
 * @param {BuildCommentOptions} options
 */
function buildComment({
  analysis,
  diffLength,
  skippedReason = "",
  relevantFiles,
}) {
  const filesList = relevantFiles?.length
    ? relevantFiles.map((file) => `- \`${file.filename}\``).join("\n")
    : "_No relevant files_";

  if (skippedReason) {
    return `## 🤖 AI PR Review

✅ Review skipped.

**Reason:** ${skippedReason}

### Files checked

${filesList}

---

📊 Optimized diff length: ${diffLength} characters  
⚠️ Review generated from PR diff only.
`;
  }

  return `## 🤖 AI PR Review

${analysis}

### Files checked

${filesList}

---

📊 Optimized diff length: ${diffLength} characters  
✂️ Max analyzed diff: ${MAX_DIFF_CHARS} characters  
⚠️ Review generated from PR diff only.
`;
}

module.exports = {
  buildComment,
};

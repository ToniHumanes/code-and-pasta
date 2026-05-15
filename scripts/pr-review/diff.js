const {
  BLOG_POST_DIRECTORY,
  BLOG_POST_EXTENSION,
} = require("./pr-review.config");

/**
 * @typedef {Object} FileDiff
 * @property {string} filename
 * @property {string} status
 * @property {number} additions
 * @property {number} deletions
 * @property {string} [patch]
 */

/**
 * @typedef {Object} OptimizedDiffResult
 * @property {FileDiff[]} relevantFiles
 * @property {string} optimizedDiff
 */

/**
 * @typedef {Object} SkipAIReviewResult
 * @property {boolean} skip
 * @property {string} [reason]
 */

/**
 * @param {string} filename
 * @returns {boolean}
 */
function isRelevantFile(filename) {
  return (
    filename.startsWith(BLOG_POST_DIRECTORY) &&
    filename.endsWith(BLOG_POST_EXTENSION)
  );
}

/**
 * @param {FileDiff[]} files
 * @returns {OptimizedDiffResult}
 */
function buildOptimizedDiff(files) {
  const relevantFiles = files.filter((file) => isRelevantFile(file.filename));

  const optimizedDiff = relevantFiles
    .map((file) => {
      if (!file.patch) return null;

      return `File: ${file.filename}
Status: ${file.status}
Changes: +${file.additions} -${file.deletions}

${file.patch}`;
    })
    .filter(Boolean)
    .join("\n\n---\n\n");

  return {
    relevantFiles,
    optimizedDiff,
  };
}

/**
 * @param {{ relevantFiles: FileDiff[]; optimizedDiff: string }} params
 * @returns {SkipAIReviewResult}
 */
function shouldSkipAIReview({ relevantFiles, optimizedDiff }) {
  if (!relevantFiles.length) {
    return {
      skip: true,
      reason: "No blog Markdown post files changed.",
    };
  }

  if (!optimizedDiff || optimizedDiff.trim().length === 0) {
    return {
      skip: true,
      reason:
        "Relevant files were detected, but no readable patch was available.",
    };
  }

  return {
    skip: false,
  };
}

module.exports = {
  buildOptimizedDiff,
  shouldSkipAIReview,
};

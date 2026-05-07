const {
  ALLOWED_EXTENSIONS,
  IGNORED_PATTERNS,
  IMPORTANT_FILE_PATTERNS,
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
  const isIgnored = IGNORED_PATTERNS.some((pattern) =>
    filename.includes(pattern),
  );

  if (isIgnored) return false;

  const hasAllowedExtension = ALLOWED_EXTENSIONS.some((extension) =>
    filename.endsWith(extension),
  );

  const isImportantFile = IMPORTANT_FILE_PATTERNS.some((pattern) =>
    filename.includes(pattern),
  );

  return hasAllowedExtension || isImportantFile;
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
      reason: "No relevant MDX, SEO, React or TypeScript files changed.",
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

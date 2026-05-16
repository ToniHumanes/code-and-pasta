const fs = require("node:fs");
const path = require("node:path");

const yaml = require("js-yaml");

const { BLOG_POST_DIRECTORY } = require("./pr-review.config");

/**
 * @typedef {Object} CheckFinding
 * @property {string} file
 * @property {string} message
 */

/**
 * @typedef {Object} RelevantFile
 * @property {string} filename
 * @property {string} status
 */

/**
 * @typedef {Object} BlogPostFrontmatter
 * @property {string} [title]
 * @property {string} [description]
 * @property {string} [image]
 * @property {string|string[]} [tags]
 */

/**
 * @typedef {"title" | "description" | "image" | "tags"} RequiredFrontmatterField
 */

/**
 * @typedef {Object} PostCheckContext
 * @property {Set<string>} definedTags
 */

const REPO_ROOT = path.resolve(__dirname, "../..");
const TAGS_FILE = path.join(REPO_ROOT, BLOG_POST_DIRECTORY, "tags.yml");
const TRUNCATE_MARKER = "<!-- truncate -->";

/**
 * @type {RequiredFrontmatterField[]}
 */
const REQUIRED_FRONTMATTER_FIELDS = ["title", "description", "image", "tags"];

/**
 * @param {string} file
 * @param {string} message
 * @returns {CheckFinding}
 */
function createFinding(file, message) {
  return {
    file,
    message,
  };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

/**
 * @param {string} content
 * @returns {BlogPostFrontmatter}
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    return {};
  }

  const parsed = yaml.load(match[1]);

  if (!isRecord(parsed)) {
    return {};
  }

  const frontmatter = /** @type {BlogPostFrontmatter} */ (parsed);
  return frontmatter;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function hasValue(value) {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }

  if (Array.isArray(value)) {
    return value.length > 0;
  }

  return value !== null && value !== undefined;
}

/**
 * @returns {Set<string>}
 */
function getDefinedTags() {
  if (!fs.existsSync(TAGS_FILE)) {
    return new Set();
  }

  const parsed = yaml.load(fs.readFileSync(TAGS_FILE, "utf8"));

  if (!isRecord(parsed)) {
    return new Set();
  }

  return new Set(Object.keys(parsed));
}

/**
 * @param {string} postFilePath
 * @param {string} imagePath
 * @returns {string}
 */
function resolveImagePath(postFilePath, imagePath) {
  if (imagePath.startsWith("@site/")) {
    return path.join(REPO_ROOT, imagePath.replace(/^@site\//, ""));
  }

  if (imagePath.startsWith("/")) {
    return path.join(REPO_ROOT, "static", imagePath);
  }

  return path.resolve(path.dirname(postFilePath), imagePath);
}

/**
 * @param {unknown} tags
 * @returns {string[]}
 */
function normalizeTags(tags) {
  if (Array.isArray(tags)) {
    return tags.filter((tag) => typeof tag === "string");
  }

  if (typeof tags === "string") {
    return [tags];
  }

  return [];
}

/**
 * @param {string} filename
 * @returns {string}
 */
function getPostFilePath(filename) {
  return path.join(REPO_ROOT, filename);
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeAnnotationValue(value) {
  return value
    .replaceAll("%", "%25")
    .replaceAll("\r", "%0D")
    .replaceAll("\n", "%0A")
    .replaceAll(",", "%2C")
    .replaceAll(":", "%3A");
}

/**
 * @param {CheckFinding} finding
 * @returns {string}
 */
function buildGitHubAnnotation(finding) {
  return `::error file=${escapeAnnotationValue(finding.file)}::${escapeAnnotationValue(finding.message)}`;
}

/**
 * @param {CheckFinding[]} findings
 * @returns {string}
 */
function formatAutomatedPostCheckError(findings) {
  if (!findings.length) {
    return "Required blog post checks passed.";
  }

  const findingsList = findings
    .map((finding) => `- ${finding.file}: ${finding.message}`)
    .join("\n");

  return `Required blog post checks failed:\n${findingsList}`;
}

/**
 * @param {RelevantFile} file
 * @returns {boolean}
 */
function shouldCheckFile(file) {
  return file.status !== "removed";
}

/**
 * @param {string} filename
 * @param {BlogPostFrontmatter} frontmatter
 * @returns {CheckFinding[]}
 */
function validateRequiredFrontmatter(filename, frontmatter) {
  return REQUIRED_FRONTMATTER_FIELDS.flatMap((field) => {
    if (hasValue(frontmatter[field])) {
      return [];
    }

    return [
      createFinding(
        filename,
        `Missing required frontmatter field: \`${field}\`.`,
      ),
    ];
  });
}

/**
 * @param {string} filename
 * @param {string} content
 * @returns {CheckFinding[]}
 */
function validateTruncateMarker(filename, content) {
  if (content.includes(TRUNCATE_MARKER)) {
    return [];
  }

  return [
    createFinding(
      filename,
      `Missing required post marker: \`${TRUNCATE_MARKER}\`.`,
    ),
  ];
}

/**
 * @param {string} filename
 * @param {string} postFilePath
 * @param {BlogPostFrontmatter} frontmatter
 * @returns {CheckFinding[]}
 */
function validateImageFile(filename, postFilePath, frontmatter) {
  if (typeof frontmatter.image !== "string") {
    return [];
  }

  const imagePath = frontmatter.image.trim();
  if (!imagePath) {
    return [];
  }

  const imageFilePath = resolveImagePath(postFilePath, imagePath);
  if (fs.existsSync(imageFilePath)) {
    return [];
  }

  return [
    createFinding(
      filename,
      `Frontmatter image does not exist: \`${frontmatter.image}\`.`,
    ),
  ];
}

/**
 * @param {string} filename
 * @param {BlogPostFrontmatter} frontmatter
 * @param {Set<string>} definedTags
 * @returns {CheckFinding[]}
 */
function validateDefinedTags(filename, frontmatter, definedTags) {
  return normalizeTags(frontmatter.tags).flatMap((tag) => {
    if (definedTags.has(tag)) {
      return [];
    }

    return [
      createFinding(
        filename,
        `Tag is not defined in \`${BLOG_POST_DIRECTORY}tags.yml\`: \`${tag}\`.`,
      ),
    ];
  });
}

/**
 * @param {RelevantFile} file
 * @param {PostCheckContext} context
 * @returns {CheckFinding[]}
 */
function checkPostFile(file, context) {
  if (!shouldCheckFile(file)) {
    return [];
  }

  const postFilePath = getPostFilePath(file.filename);
  if (!fs.existsSync(postFilePath)) {
    return [
      createFinding(
        file.filename,
        "Changed blog post file does not exist in the checkout.",
      ),
    ];
  }

  const content = fs.readFileSync(postFilePath, "utf8");
  const frontmatter = parseFrontmatter(content);

  return [
    ...validateRequiredFrontmatter(file.filename, frontmatter),
    ...validateTruncateMarker(file.filename, content),
    ...validateImageFile(file.filename, postFilePath, frontmatter),
    ...validateDefinedTags(file.filename, frontmatter, context.definedTags),
  ];
}

/**
 * @param {RelevantFile[]} relevantFiles
 * @returns {CheckFinding[]}
 */
function runAutomatedPostChecks(relevantFiles) {
  const context = {
    definedTags: getDefinedTags(),
  };

  return relevantFiles.flatMap((file) => checkPostFile(file, context));
}

module.exports = {
  buildGitHubAnnotation,
  formatAutomatedPostCheckError,
  runAutomatedPostChecks,
};

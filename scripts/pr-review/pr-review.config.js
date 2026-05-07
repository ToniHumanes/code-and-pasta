const COMMENT_MARKER = "<!-- ai-pr-review-comment -->";
const MAX_DIFF_CHARS = 8000;

const ALLOWED_EXTENSIONS = [".md", ".mdx", ".js", ".jsx", ".ts", ".tsx"];

const IMPORTANT_FILE_PATTERNS = ["docusaurus.config", "sidebars"];

const IGNORED_PATTERNS = [
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "node_modules/",
  "build/",
  ".docusaurus/",
  ".env",
];

module.exports = {
  ALLOWED_EXTENSIONS,
  COMMENT_MARKER,
  IGNORED_PATTERNS,
  IMPORTANT_FILE_PATTERNS,
  MAX_DIFF_CHARS,
};

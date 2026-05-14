const { COMMENT_MARKER } = require("./pr-review.config");
const { prNumber, repo, token } = require("./pr-review.vars");

const BASE_URL = `https://api.github.com/repos/${repo}`;
const PER_PAGE = 100;

const endpoints = {
  comments: `${BASE_URL}/issues/${prNumber}/comments`,
  files: `${BASE_URL}/pulls/${prNumber}/files`,
};

const headers = {
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
};

/**
 * @param {string | URL} endpoint
 * @param {string} errorLabel
 */
async function fetchPaginated(endpoint, errorLabel) {
  const results = [];
  let page = 1;

  while (true) {
    const url = new URL(endpoint);
    url.searchParams.set("per_page", String(PER_PAGE));
    url.searchParams.set("page", String(page));

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `GitHub ${errorLabel} error: ${response.status} ${errorBody}`,
      );
    }

    const pageResults = await response.json();
    results.push(...pageResults);

    if (pageResults.length < PER_PAGE) {
      return results;
    }

    page += 1;
  }
}

async function getChangedFiles() {
  return fetchPaginated(endpoints.files, "files");
}

async function findExistingComment() {
  const comments = await fetchPaginated(endpoints.comments, "list comments");

  return comments.find((comment) => comment.body?.includes(COMMENT_MARKER));
}

/**
 * @param {string} body
 */
function buildReviewSection(body) {
  return `## AI PR Review update

_Generated at: ${new Date().toISOString()}_

${body.trim()}`;
}

/**
 * @param {string} body
 */
function ensureCommentMarker(body) {
  return body.includes(COMMENT_MARKER) ? body : `${COMMENT_MARKER}

${body}`;
}

/**
 * @param {string} body
 */
async function upsertPullRequestComment(body) {
  const existingComment = await findExistingComment();

  const reviewSection = buildReviewSection(body);

  if (existingComment) {
    const bodyWithMarker = `${ensureCommentMarker(existingComment.body).trim()}

---

${reviewSection}`;

    const response = await fetch(existingComment.url, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: bodyWithMarker }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `GitHub update comment error: ${response.status} ${errorBody}`,
      );
    }

    return;
  }

  const bodyWithMarker = `${COMMENT_MARKER}

${reviewSection}`;

  const response = await fetch(endpoints.comments, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ body: bodyWithMarker }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `GitHub create comment error: ${response.status} ${errorBody}`,
    );
  }
}

module.exports = {
  getChangedFiles,
  upsertPullRequestComment,
};

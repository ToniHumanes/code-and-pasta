const { COMMENT_MARKER } = require("./pr-review.config");
const { prNumber, repo, token } = require("./pr-review.vars");

const BASE_URL = `https://api.github.com/repos/${repo}`;
const PER_PAGE = 100;
const MAX_RESOLVED_REVIEWS = 5;
const RESOLVED_REVIEWS_START_MARKER =
  "<!-- ai-pr-review-resolved-reviews-start -->";
const RESOLVED_REVIEWS_END_MARKER =
  "<!-- ai-pr-review-resolved-reviews-end -->";
const CURRENT_REVIEW_START_MARKER =
  "<!-- ai-pr-review-current-review-start -->";
const CURRENT_REVIEW_END_MARKER = "<!-- ai-pr-review-current-review-end -->";
const HISTORY_ENTRY_MARKER = "<!-- ai-pr-review-history-entry -->";

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
function buildCurrentReviewBlock(body) {
  return `${CURRENT_REVIEW_START_MARKER}
${body.trim()}
${CURRENT_REVIEW_END_MARKER}`;
}

/**
 * @param {string[]} resolvedReviews
 */
function buildResolvedReviewsBlock(resolvedReviews) {
  if (!resolvedReviews.length) {
    return "";
  }

  const historyEntries = resolvedReviews
    .map((review) => `${HISTORY_ENTRY_MARKER}
${review.trim()}`)
    .join("\n\n");

  return `<details>
<summary>Resolved previous AI reviews</summary>

${RESOLVED_REVIEWS_START_MARKER}
${historyEntries}
${RESOLVED_REVIEWS_END_MARKER}

</details>

---

`;
}

/**
 * @param {string[]} resolvedReviews
 * @param {string} body
 */
function buildManagedCommentBody(resolvedReviews, body) {
  return `${COMMENT_MARKER}

${buildResolvedReviewsBlock(resolvedReviews)}${buildCurrentReviewBlock(body)}`;
}

/**
 * @param {string} body
 * @param {string} startMarker
 * @param {string} endMarker
 */
function getMarkedSection(body, startMarker, endMarker) {
  const startIndex = body.indexOf(startMarker);

  if (startIndex === -1) {
    return null;
  }

  const contentStartIndex = startIndex + startMarker.length;
  const endIndex = body.indexOf(endMarker, contentStartIndex);

  if (endIndex === -1) {
    return null;
  }

  return body.slice(contentStartIndex, endIndex).trim();
}

/**
 * @param {string} body
 */
function getResolvedReviews(body) {
  const resolvedReviews = getMarkedSection(
    body,
    RESOLVED_REVIEWS_START_MARKER,
    RESOLVED_REVIEWS_END_MARKER,
  );

  if (!resolvedReviews) {
    return [];
  }

  return resolvedReviews
    .split(HISTORY_ENTRY_MARKER)
    .map((review) => review.trim())
    .filter(Boolean);
}

/**
 * @param {string} body
 */
function getPreviousCurrentReview(body) {
  return getMarkedSection(
    body,
    CURRENT_REVIEW_START_MARKER,
    CURRENT_REVIEW_END_MARKER,
  );
}

/**
 * @param {string} body
 */
function getLegacyReview(body) {
  return body.replace(COMMENT_MARKER, "").trim();
}

/**
 * @param {string} body
 */
async function upsertPullRequestComment(body) {
  const existingComment = await findExistingComment();

  const reviewSection = buildReviewSection(body);

  if (existingComment) {
    const previousReview =
      getPreviousCurrentReview(existingComment.body) ??
      getLegacyReview(existingComment.body);
    const resolvedReviews = [
      previousReview,
      ...getResolvedReviews(existingComment.body),
    ]
      .filter(Boolean)
      .slice(0, MAX_RESOLVED_REVIEWS);
    const bodyWithMarker = buildManagedCommentBody(
      resolvedReviews,
      reviewSection,
    );

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

  const bodyWithMarker = buildManagedCommentBody([], reviewSection);

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

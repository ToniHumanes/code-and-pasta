# Pull Request Management Workflow

Use this workflow when Codex needs to create or update the pull request for the current branch.

## Goal

Ensure there is at most one pull request for the current branch, then write a clear title and description based on the actual branch changes.

## Execution Steps

1. Detect the current git branch.
2. Detect the repository owner and name from the git remote, then resolve the canonical repository slug if GitHub redirects or the repo was renamed.
3. Verify which authentication method can write pull requests.
4. Check whether a pull request already exists for the current branch.
5. If no pull request exists, create one against the default base branch.
6. Inspect the branch changes before writing any PR content.
7. Update the PR title and description in English.

## Rules

### 0. Verify authentication before changing PRs

- First try GitHub MCP for pull request reads and writes.
- If GitHub MCP can read but cannot write, use a local fallback such as `gh` or the GitHub REST API with a local token.
- If using the GitHub REST API, confirm the token has the required permission for the pull request endpoint.
- If the API response header `x-accepted-github-permissions` includes `pull_requests=write`, the local token must provide that permission.
- If no available authentication method has pull request write access, stop and tell the user exactly which permission is missing.

### 1. Check whether a PR already exists

- Read the current branch with git.
- Read the repository owner and repository name from the remote.
- If GitHub resolves the remote to a different repository slug, use the canonical owner and repository name for all PR operations.
- Search for an open pull request whose `head` matches the current branch.
- If an open pull request exists, reuse it.
- If no open pull request exists, create a new one.
- Never create a duplicate PR for the same branch if one already exists.

### 2. Create the PR only when needed

- Use the repository default branch as the base branch unless the user asked for another base.
- Create the PR only after confirming that no open PR exists for the current branch.
- When creating the PR, use a temporary title and body if needed, then replace them after analyzing the diff.

### 3. Generate title and description from real changes

- Inspect the diff between the current branch and the base branch.
- Use only verified changes from the diff, changed files, and commits.
- Do not invent features, fixes, tests, or refactors that are not present in the branch.
- Derive the PR title prefix from the branch name before writing the final title.

## Writing Guidelines

### Title

- Must be written in English.
- Keep it short, clear, and easy to understand.
- Prefer a simple technical summary of the main change.
- Prefix the title according to the branch name:
  - If the branch contains `feature/`, start the title with `Feat: `
  - If the branch contains `fix/`, start the title with `Fix: `
  - If the branch contains `chore/`, start the title with `Chore: `
  - If the branch contains `refactor/`, start the title with `Refactor: `
- After the prefix, write a short technical summary of the verified change.
- Good examples:
  - `Refactor: component architecture`
  - `Feat: move tech note demos into shared source folders`
  - `Feat: add reusable homepage section components`

### Description

- Must be written in English.
- Use simple language.
- Use technical words when they improve precision.
- Keep the description brief and factual.
- Prefer this structure:

```md
## Summary

Short explanation of what this branch changes.

## Changes

- First relevant change
- Second relevant change
- Third relevant change
```

- Add a `## Testing` section only if tests were actually run and their result is known.
- If no tests were run, do not claim test coverage.

## Decision Logic

```text
IF open PR exists for current branch
  THEN update that PR
ELSE
  create a new PR

AFTER THAT
  analyze branch changes
  write title in English
  write description in English
  update the PR title and description
```

## Expected Tool Usage

- Git: detect current branch and repository remote.
- GitHub MCP: search PRs, create PR if needed, update PR title and body.
- Fallback auth: `gh` or GitHub REST API when GitHub MCP does not have write access.
- GitHub repo metadata: confirm the default branch and canonical repository slug when the remote may be outdated.
- GitHub MCP or git diff: inspect changed files and summarize the branch accurately.

## Safety Checks

- Do not create more than one open PR for the same branch.
- Do not overwrite the base branch unless the user explicitly asks for it.
- Do not write vague PR text such as `minor changes` or `updates`.
- Do not mention tests, migrations, or breaking changes unless they are confirmed.
- If PR creation fails because of missing permissions, report the missing permission and do not keep retrying blindly.

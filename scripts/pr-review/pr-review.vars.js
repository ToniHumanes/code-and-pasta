const fs = require("fs");

/**
 * @param {string} name
 */
function getRequiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

const eventPath = getRequiredEnv("GITHUB_EVENT_PATH");
const token = getRequiredEnv("GITHUB_TOKEN");
const repo = getRequiredEnv("GITHUB_REPOSITORY");
const openAiApiKey = getRequiredEnv("OPENAI_API_KEY");
const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const prNumber = event.pull_request?.number;

if (!prNumber) {
  throw new Error("Missing pull request number in GitHub event payload.");
}

module.exports = {
  openAiApiKey,
  prNumber,
  repo,
  token,
};

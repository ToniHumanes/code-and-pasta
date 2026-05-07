async function main() {
  try {
    const { analyzeDiffWithAI } = require("./ai");
    const { buildComment } = require("./comment");
    const { buildOptimizedDiff, shouldSkipAIReview } = require("./diff");
    const { getChangedFiles, upsertPullRequestComment } = require("./github");
    const { prNumber } = require("./pr-review.vars");

    console.log("PR number:", prNumber);
    const files = await getChangedFiles();
    const { relevantFiles, optimizedDiff } = buildOptimizedDiff(files);
    const skipResult = shouldSkipAIReview({
      relevantFiles,
      optimizedDiff,
    });

    if (skipResult.skip) {
      const comment = buildComment({
        analysis: null,
        diffLength: optimizedDiff.length,
        skippedReason: skipResult.reason ?? "",
        relevantFiles,
      });

      await upsertPullRequestComment(comment);
      console.log("AI review skipped and comment upserted");
      return;
    }

    const analysis = await analyzeDiffWithAI(optimizedDiff);
    const comment = buildComment({
      analysis,
      diffLength: optimizedDiff.length,
      relevantFiles,
    });

    await upsertPullRequestComment(comment);
    console.log("AI review upserted successfully");
  } catch (error) {
    console.error(
      "Error in PR review workflow:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

main();

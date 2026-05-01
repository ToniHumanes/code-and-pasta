#!/usr/bin/env node

import { mkdir, readdir, rename, rm, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";
import {
  optimizedExtensions,
  presetRules,
  presets,
  sourceDirectories,
  sourceExtensions,
} from "./optimize-images.config.mjs";

const rootDir = process.cwd();

const args = new Set(process.argv.slice(2));
const flags = {
  check: args.has("--check"),
  deleteOriginals: args.has("--delete-originals"),
  dryRun: args.has("--dry-run"),
  overwrite: args.has("--overwrite"),
};

function toAbsolutePath(relativePath) {
  return path.resolve(rootDir, relativePath);
}

function normalizePath(filePath) {
  return filePath.replaceAll(path.sep, "/");
}

function formatBytes(bytes) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function formatSavings(inputBytes, outputBytes) {
  const savings = inputBytes - outputBytes;
  const percent = (savings / inputBytes) * 100;

  return `${formatBytes(savings)} (${percent.toFixed(1)}%)`;
}

function getOutputPath(inputRelativePath, format) {
  const extension = path.extname(inputRelativePath);
  return inputRelativePath.replace(new RegExp(`${extension}$`, "i"), `.${format}`);
}

function resolvePreset(relativePath) {
  const normalizedPath = normalizePath(relativePath);
  const matchedRule = presetRules.find((rule) => rule.matches(normalizedPath));

  if (!matchedRule) {
    throw new Error(`No preset rule found for: ${normalizedPath}`);
  }

  return {
    presetName: matchedRule.name,
    ...presets[matchedRule.preset],
  };
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function collectFiles(directoryPath, extensions) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath, extensions)));
      continue;
    }

    if (!extensions.has(path.extname(entry.name).toLowerCase())) {
      continue;
    }

    files.push(entryPath);
  }

  return files.sort((left, right) => left.localeCompare(right));
}

async function getAvailableSourceDirectories() {
  const availableDirectories = [];

  for (const sourceDirectory of sourceDirectories) {
    const absolutePath = toAbsolutePath(sourceDirectory);

    if (await pathExists(absolutePath)) {
      availableDirectories.push(absolutePath);
    }
  }

  if (availableDirectories.length === 0) {
    throw new Error(
      `Missing source directories: ${sourceDirectories.join(", ")}`,
    );
  }

  return availableDirectories;
}

async function buildJobs() {
  const sourceDirectoryPaths = await getAvailableSourceDirectories();
  const seenOutputs = new Set();
  const jobs = [];

  for (const sourceDirectoryPath of sourceDirectoryPaths) {
    const inputPaths = await collectFiles(sourceDirectoryPath, sourceExtensions);

    for (const inputPath of inputPaths) {
      const input = normalizePath(path.relative(rootDir, inputPath));
      const preset = resolvePreset(input);
      const output = getOutputPath(input, preset.format);

      if (seenOutputs.has(output)) {
        throw new Error(`Duplicate optimized output path detected: ${output}`);
      }

      seenOutputs.add(output);
      jobs.push({
        input,
        output,
        ...preset,
      });
    }
  }

  return jobs;
}

async function buildCheckJobs(optimizationJobs) {
  const sourceDirectoryPaths = await getAvailableSourceDirectories();
  const jobs = [...optimizationJobs];
  const knownOutputs = new Set(optimizationJobs.map((job) => job.output));

  for (const sourceDirectoryPath of sourceDirectoryPaths) {
    const optimizedPaths = await collectFiles(sourceDirectoryPath, optimizedExtensions);

    for (const optimizedPath of optimizedPaths) {
      const output = normalizePath(path.relative(rootDir, optimizedPath));

      if (knownOutputs.has(output)) {
        continue;
      }

      const preset = resolvePreset(output);

      jobs.push({
        input: null,
        output,
        ...preset,
      });
      knownOutputs.add(output);
    }
  }

  return jobs.sort((left, right) => left.output.localeCompare(right.output));
}

function buildPipeline(image, job) {
  const resizedImage = image.rotate().resize({
    width: job.maxWidth,
    withoutEnlargement: true,
  });

  switch (job.format) {
    case "jpg":
    case "jpeg":
      return resizedImage.jpeg({
        quality: job.quality,
        mozjpeg: true,
      });
    case "png":
      return resizedImage.png({
        quality: job.quality,
        compressionLevel: 9,
        palette: true,
      });
    case "avif":
      return resizedImage.avif({
        quality: job.quality,
      });
    case "webp":
    default:
      return resizedImage.webp({
        quality: job.quality,
      });
  }
}

async function removeOriginalIfRequested(job) {
  if (!flags.deleteOriginals) {
    return;
  }

  const inputPath = toAbsolutePath(job.input);
  const outputPath = toAbsolutePath(job.output);

  if (!(await pathExists(inputPath)) || !(await pathExists(outputPath))) {
    return;
  }

  if (flags.dryRun) {
    console.log(`plan  delete original: ${job.input}`);
    return;
  }

  await rm(inputPath);
  console.log(`del   ${job.input}`);
}

async function optimizeImage(job) {
  const inputPath = toAbsolutePath(job.input);
  const outputPath = toAbsolutePath(job.output);
  const tempOutputPath =
    inputPath === outputPath ? `${outputPath}.tmp-${process.pid}` : outputPath;

  if (!(await pathExists(inputPath))) {
    console.warn(`skip  missing input: ${job.input}`);
    return;
  }

  if (!flags.overwrite && (await pathExists(outputPath))) {
    console.log(`skip  already exists: ${job.output}`);
    await removeOriginalIfRequested(job);
    return;
  }

  const inputStats = await stat(inputPath);
  const metadata = await sharp(inputPath).metadata();

  if (flags.dryRun) {
    console.log(
      `plan  ${job.input} -> ${job.output} | preset ${job.presetName} | ${metadata.width}x${metadata.height} -> max width ${job.maxWidth}px`,
    );
    await removeOriginalIfRequested(job);
    return;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });

  const pipeline = buildPipeline(sharp(inputPath), job);
  await pipeline.toFile(tempOutputPath);

  if (tempOutputPath !== outputPath) {
    await rename(tempOutputPath, outputPath);
  }

  const outputStats = await stat(outputPath);

  console.log(
    `done  ${job.output} | preset ${job.presetName} | ${formatBytes(inputStats.size)} -> ${formatBytes(outputStats.size)} | saved ${formatSavings(inputStats.size, outputStats.size)}`,
  );

  await removeOriginalIfRequested(job);
}

async function checkImage(job) {
  const outputPath = toAbsolutePath(job.output);

  if (!(await pathExists(outputPath))) {
    console.error(`fail  missing optimized image: ${job.output}`);
    return false;
  }

  if (!job.input) {
    console.log(`ok    ${job.output} | preset ${job.presetName}`);
    return true;
  }

  const inputPath = toAbsolutePath(job.input);

  if (!(await pathExists(inputPath))) {
    console.error(`fail  missing input: ${job.input}`);
    return false;
  }

  const inputStats = await stat(inputPath);
  const outputStats = await stat(outputPath);
  if (outputStats.mtimeMs < inputStats.mtimeMs) {
    console.error(`fail  outdated optimized image: ${job.output}`);
    return false;
  }

  console.log(`ok    ${job.output} | preset ${job.presetName}`);
  return true;
}

async function runCheck(jobs) {
  console.log(`checking ${jobs.length} optimized image(s)`);

  let allValid = true;

  for (const job of jobs) {
    const isValid = await checkImage(job);
    allValid = allValid && isValid;
  }

  if (!allValid) {
    process.exitCode = 1;
  }
}

async function runOptimize(jobs) {
  console.log(
    `optimizing ${jobs.length} image(s)${flags.dryRun ? " in dry-run mode" : ""}`,
  );

  for (const job of jobs) {
    await optimizeImage(job);
  }
}

async function main() {
  const jobs = await buildJobs();

  if (flags.check) {
    const checkJobs = await buildCheckJobs(jobs);
    await runCheck(checkJobs);
    return;
  }

  await runOptimize(jobs);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

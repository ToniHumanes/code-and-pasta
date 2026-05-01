const sourceDirectories = ["assets/source-images/blog", "assets/source-images/home"];
const optimizedDirectories = ["blog/img", "static/img/home"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const optimizedExtensions = new Set([".webp"]);

const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 900,
    quality: 90,
  },
  homeImage: {
    format: "webp",
    maxWidth: 720,
    quality: 90,
  },
  homeFeatureIcon: {
    format: "webp",
    maxWidth: 256,
    quality: 90,
  },
};

const presetRules = [
  {
    name: "blogCover",
    matches: (relativePath) =>
      relativePath.startsWith("assets/source-images/blog/") ||
      relativePath.startsWith("blog/img/"),
    outputDirectory: "blog/img",
    preset: "blogCover",
  },
  {
    name: "homeHeroImage",
    matches: (relativePath) =>
      relativePath.startsWith("assets/source-images/home/code-and-pasta-") ||
      relativePath.startsWith("static/img/home/code-and-pasta-"),
    outputDirectory: "static/img/home",
    preset: "homeImage",
  },
  {
    name: "homeFeatureIcon",
    matches: (relativePath) =>
      relativePath.startsWith("assets/source-images/home/") ||
      relativePath.startsWith("static/img/home/"),
    outputDirectory: "static/img/home",
    preset: "homeFeatureIcon",
  },
];

export {
  optimizedDirectories,
  optimizedExtensions,
  presetRules,
  presets,
  sourceDirectories,
  sourceExtensions,
};

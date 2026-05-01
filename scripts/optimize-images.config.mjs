const sourceDirectories = ["blog/img", "static/img/home"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const optimizedExtensions = new Set([".webp"]);

const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 900,
    quality: 82,
  },
  homeImage: {
    format: "webp",
    maxWidth: 720,
    quality: 82,
  },
  homeFeatureIcon: {
    format: "webp",
    maxWidth: 128,
    quality: 82,
  },
};

const presetRules = [
  {
    name: "blogCover",
    matches: (relativePath) => relativePath.startsWith("blog/img/"),
    preset: "blogCover",
  },
  {
    name: "homeHeroImage",
    matches: (relativePath) =>
      relativePath.startsWith("static/img/home/code-and-pasta-"),
    preset: "homeImage",
  },
  {
    name: "homeFeatureIcon",
    matches: (relativePath) => relativePath.startsWith("static/img/home/"),
    preset: "homeFeatureIcon",
  },
];

export {
  optimizedExtensions,
  presetRules,
  presets,
  sourceDirectories,
  sourceExtensions,
};

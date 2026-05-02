const sourceDirectories = ["static/img/source-images/blog"];
const optimizedDirectories = ["blog/img"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const optimizedExtensions = new Set([".webp"]);

const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 900,
    mobileWidth: 600,
    quality: 90,
  },
};

const presetRules = [
  {
    name: "blogCover",
    matches: (relativePath) =>
      relativePath.startsWith("static/img/source-images/blog/") ||
      relativePath.startsWith("blog/img/"),
    outputDirectory: "blog/img",
    preset: "blogCover",
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

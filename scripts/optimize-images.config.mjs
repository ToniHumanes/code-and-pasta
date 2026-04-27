const sourceDirectories = ["blog/img"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const optimizedExtensions = new Set([".webp"]);

const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 1200,
    quality: 100,
  },
};

const presetRules = [
  {
    name: "blogCover",
    matches: (relativePath) => relativePath.startsWith("blog/img/"),
    preset: "blogCover",
  },
];

export {
  optimizedExtensions,
  presetRules,
  presets,
  sourceDirectories,
  sourceExtensions,
};

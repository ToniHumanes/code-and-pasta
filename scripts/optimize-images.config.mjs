const sourceDirectories = ["blog/img", "static/img/home"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const optimizedExtensions = new Set([".webp"]);

const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 1200,
    quality: 100,
  },
  homeImage: {
    format: "webp",
    maxWidth: 900,
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
    name: "homeImage",
    matches: (relativePath) => relativePath.startsWith("static/img/home/"),
    preset: "homeImage",
  },
];

export {
  optimizedExtensions,
  presetRules,
  presets,
  sourceDirectories,
  sourceExtensions,
};

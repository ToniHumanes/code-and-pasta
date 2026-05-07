/**
 * @typedef {Object} ImagePreset
 * @property {string} format
 * @property {number} maxWidth
 * @property {number} [mobileWidth]
 * @property {number} quality
 */

/**
 * @typedef {"blogCover"} PresetName
 */

/**
 * @typedef {Object} PresetRule
 * @property {string} name
 * @property {(relativePath: string) => boolean} matches
 * @property {string} outputDirectory
 * @property {PresetName} preset
 */

const sourceDirectories = ["assets/source-images/blog"];
const optimizedDirectories = ["blog/img"];

const sourceExtensions = new Set([".jpg", ".jpeg", ".png"]);
const optimizedExtensions = new Set([".webp"]);

/**
 * @type {Record<PresetName, ImagePreset>}
 */
const presets = {
  blogCover: {
    format: "webp",
    maxWidth: 700,
    mobileWidth: 420,
    quality: 80,
  },
};

/**
 * @type {PresetRule[]}
 */
const presetRules = [
  {
    name: "blogCover",
    matches: (relativePath) =>
      relativePath.startsWith("assets/source-images/blog/") ||
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

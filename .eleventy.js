const { inspect } = require("util");

const escapeChars = {
  "¢": "cent",
  "£": "pound",
  "¥": "yen",
  "€": "euro",
  "©": "copy",
  "®": "reg",
  "<": "lt",
  ">": "gt",
  '"': "quot",
  "&": "amp",
  "'": "#39",
};

let regexString = "[";
for (let key in escapeChars) {
  regexString += key;
}
regexString += "]";

const regex = new RegExp(regexString, "g");

const escapeHTML = (str) => {
  return str.replace(regex, function (m) {
    return "&" + escapeChars[m] + ";";
  });
};

module.exports = function (config) {
  config.addPassthroughCopy({ public: "./" });

  config.setBrowserSyncConfig({
    files: ["_site/**/*"],
  });

  config.addWatchTarget("./src/_js/**/*");

  config.addFilter("debug", (content) => {
    return `<div style="max-width: 100%; overflow-x: auto"><pre>${escapeHTML(
      JSON.stringify(content, null, 2)
    )}</pre></div>`;
  });

  return {
    templateFormats: ["md", "njk", "jpg", "png", "gif", "liquid"],
    dir: {
      input: "src",
      output: "_site",
      layouts: "_js/layouts",
      data: "_js/data",
    },
  };
};

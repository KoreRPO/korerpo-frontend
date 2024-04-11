import pluginWebc from "@11ty/eleventy-plugin-webc";

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

export default function (config) {
  config.addPassthroughCopy({ public: "./" });

  config.addPlugin(pluginWebc, {
    components: "_components/**/*",
  });

  config.addWatchTarget("./src/**/*");

  config.addFilter("debug", (content) => {
    return `<div style="max-width: 100%; overflow-x: auto"><pre>${escapeHTML(
      JSON.stringify(content, null, 2)
    )}</pre></div>`;
  });

  config.addGlobalData(
    "copyright",
    () =>
      `&copy; ${[...new Set([2022, new Date().getFullYear()])].join(
        "-"
      )} KORE RPO. All Rights Reserved.`
  );

  config.setServerOptions({
    port: 9000,
  });

  return {
    templateFormats: ["webc"],
    dir: {
      input: "./src",
      output: "_site",
      layouts: "../_layouts",
      data: "../_data",
    },
  };
}

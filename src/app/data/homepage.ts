import sanity from "@korerpo/cms";

module.exports = async () => {
  const page = await sanity.homepage({});
  return page;
};

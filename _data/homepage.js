import sanity from "@korerpo/cms";

export default async () => {
  const page = await sanity.homepage({});
  return page;
};

import sanity from "@korerpo/cms";

export default async () => {
  const pages = await sanity.pages({});
  return pages;
};

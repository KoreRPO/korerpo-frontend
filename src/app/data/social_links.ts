import sanity from "@korerpo/cms";

module.exports = async () => {
  const page = await sanity.homepage({});
  if (page) {
    return {
      facebook: page.facebook_link,
      twitter: page.twitter_link,
      linkedin: page.linkedin_link,
    };
  }
  return {};
};

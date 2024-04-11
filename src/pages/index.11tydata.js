import { SanityConfig } from "@korerpo/cms";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient(SanityConfig);

export default {
  eleventyComputed: {
    seo_title: (data) => data.static_page?.seo_title || "Kore RPO",
    seo_description: (data) => data.static_page?.seo_description || "",
    social_image: (data) => {
      if (data?.static_page?.social_image?._ref) {
        const builder = imageUrlBuilder(client);
        return builder
          .image(data.static_page.social_image)
          .width(1200)
          .height(630)
          .dpr(2)
          .url();
      }
      return "";
    },
  },
};

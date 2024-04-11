import sanity from "@korerpo/cms";
import util from "util";
import { SanityConfig } from "@korerpo/cms/dist/client/index.js";
import { createClient } from "@sanity/client";

const client = createClient(SanityConfig);

const inspect = (obj) =>
  util.inspect(obj, { depth: null, showHidden: false, colors: true });

export default async () => {
  const settings = await sanity.site_settings({});
  settings.footer_links = await Promise.all(
    settings.footer_links.map(async (link) => {
      if (link.page?._type === "reference") {
        const page = await client.fetch(`*[_id == $id]{title, slug}[0]`, {
          id: link.page._ref,
        });
        link.page = page;
      }
      return link;
    })
  );
  return settings;
};

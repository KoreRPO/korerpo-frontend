import SiteFooter from "../components/site-footer";
import SiteHeader from "../components/site-header";

interface PageProps {
  title: string;
  content: string;
  lang: string;
  description: string;
  social_image: string;
  social_links: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
  html_classes?: string;
}

const defaultDescription =
  "We help recruiting leaders fill over 80% more positions without hiring more recruiters.";

module.exports = ({
  title,
  content,
  lang = "en",
  description = defaultDescription,
  social_image = "/assets/social-image.png",
  social_links = {},
  html_classes = "",
}: PageProps) => {
  const mnmlCSS =
    process.env.ELEVENTY_ENV === "dev"
      ? "/assets/mnml-plus-opencolor.css"
      : "https://unpkg.com/@dryan-llc/mnml.css/dist/mnml-plus-opencolor.css";
  const seo_title = [title || "KORE RPO", "KORE RPO"]
    .filter((val, index, self) => self.indexOf(val) === index)
    .join(" | ");

  return `
  <!doctype html>
  <html lang="${lang}" data-theme="light" class="${html_classes}">
    <head>
      <meta charset="utf-8">
      <title>${seo_title}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <meta property="og:title" content="${title}">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="description" property="og:description" content="${description}">
      <meta name="twitter:card" content="summary_large_image">
      <meta property="og:image" content="${
        social_image.startsWith("https://") || social_image.startsWith("http://")
          ? social_image
          : "https://www.korerpo.com" + social_image
      }">
      <meta name="theme-color" content="#1658B3">
      <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;600&display=swap">
      <link rel="stylesheet" href="${mnmlCSS}">
      <link rel="stylesheet" href="/assets/screen.css">
      <!-- Start of HubSpot Embed Code -->
      <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/21430261.js"></script>
      <!-- End of HubSpot Embed Code -->
    </head>
    <body>
      <a href="#main-content" class="skip-link reader-only">
        Jump to content
      </a>
      ${SiteHeader()}
      <main id="main-content" class="container">
        ${content}
      </main>
      ${SiteFooter({ socials: { ...social_links } })}
      <script src="/assets/site.js"></script>
      <script src="https://unpkg.com/@dryan-llc/mnml.js" type="module"></script>
    </body>
    <!--! Font Awesome Pro 6.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
  </html>
`;
};

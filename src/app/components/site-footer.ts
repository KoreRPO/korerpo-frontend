import Logo from "./logo";
import { FacebookLogo, LinkedInLogo, TwitterLogo } from "./social-logos";

interface SiteFooterProps {
  socials?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const SiteFooter = ({ socials = {} }: SiteFooterProps) => {
  const socialLinks: string[] = [];
  if (socials && Object.keys(socials).length) {
    if (socials.facebook) {
      socialLinks.push(
        `<a href=${
          socials.facebook
        } target="_blank" rel="noopener noreferrer"><span class="reader-only">KORE RPO on Facebook</span> ${FacebookLogo()}</a>`
      );
    }
    if (socials.twitter) {
      socialLinks.push(
        `<a href=${
          socials.twitter
        } target="_blank" rel="noopener noreferrer"><span class="reader-only">KORE RPO on Facebook</span> ${TwitterLogo()}</a>`
      );
    }
    if (socials.linkedin) {
      socialLinks.push(
        `<a href=${
          socials.linkedin
        } target="_blank" rel="noopener noreferrer"><span class="reader-only">KORE RPO on LinkedIn</span> ${LinkedInLogo()}</a>`
      );
    }
  }
  const socialNav = socialLinks.length
    ? `<nav class="socials">\n${socialLinks.join("\n")}\n</nav>`
    : "";
  return `<footer class="container sticky">
    ${Logo()}
    ${socialNav}
    <small class="license">
        &copy; Copyright ${["2022", new Date().getFullYear().toString()]
          .filter((val, index, self) => self.indexOf(val) === index)
          .join("-")} KORE RPO. All Rights Reserved.
    </small>
</footer>`;
};

export default SiteFooter;

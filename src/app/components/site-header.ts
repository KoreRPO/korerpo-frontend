import Logo from "./logo";
import PrimaryNav from "./navigation";

interface SiteHeaderProps {
  sticky?: boolean;
  showTestimonials?: boolean;
}

const SiteHeader = (
  { sticky, showTestimonials }: SiteHeaderProps = { sticky: false }
) => `
  <header${sticky ? ' class="sticky"' : ""}>
    <div class="container">
      <a href="/" class="site-brand">
        ${Logo()}
        <span class="reader-only">KORE RPO</span>
      </a>
      ${PrimaryNav({ showTestimonials })}
    </div>
  </header>
`;

export default SiteHeader;

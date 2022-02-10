import Logo from "./logo";
import PrimaryNav from "./navigation";

interface SiteHeaderProps {
  sticky: boolean;
}

const SiteHeader = ({ sticky }: SiteHeaderProps = { sticky: false }) => `
  <header${sticky ? ' class="sticky"' : ""}>
    <div class="container">
      <a href="/" class="site-brand">
        ${Logo()}
        <span class="reader-only">KORE RPO</span>
      </a>
      ${PrimaryNav()}
    </div>
  </header>
`;

export default SiteHeader;

import MenuIcon from "./icon-menu";
import { XIcon } from "./icon-x";

interface PrimaryNavProps {}

const PrimaryNav = ({}: PrimaryNavProps = {}) => `
  <div class="primary-nav__wrapper">
    <button class="primary-nav__toggle no-bg" tabindex="-1" aria-hidden="true">
      Menu
      ${MenuIcon()}
    </button>
    <nav aria-label="Main menu" class="primary-nav">
      <button class="primary-nav__toggle no-bg" tabindex="-1" aria-hidden="true">
        Close
        ${XIcon()}
      </button>
      <a href="/#approach">Approach</a>
      <a href="/#results">Results</a>
      <a href="/#about">About</a>
      <a href="/contact" class="button outline blue-medium">
        Get Started
      </a>
    </nav>
  </div>
`;

export default PrimaryNav;

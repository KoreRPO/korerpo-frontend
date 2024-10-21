(() => {
    if (customElements.get("korerpo-navigation")) return;

    class KoreRPONavigation extends HTMLElement {
      connectedCallback() {
        this.addEventListener("click", (event) => {
          const toggle = event.target.closest(".primary-nav__toggle");
          if (toggle) {
            event.preventDefault();
            document.documentElement.classList.toggle("show-nav");
            toggle.blur();
            return;
          }

          const anchor = event.target.closest('.primary-nav a[href^="#"]');
          if (anchor) {
            document.documentElement.classList.remove("show-nav");
          }
        });
      }
    }

    customElements.define("korerpo-navigation", KoreRPONavigation);
  })();
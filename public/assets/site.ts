import mnml from "@dryan-llc/mnml.js";

mnml.listen("click", ".primary-nav__toggle", (ev, btn) => {
  ev.preventDefault();
  document.documentElement.classList.toggle("show-nav");
  btn.blur();
});

mnml.listen("click", '.primary-nav a[href^="#"]', () => {
  document.documentElement.classList.remove("show-nav");
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        if (target.dataset.src) {
          target.src = target.dataset.src;
        }
        intersectionObserver.unobserve(target);
      }
    });
  },
  {
    root: document.documentElement,
    rootMargin: "0px",
    threshold: 0.01,
  }
);

const attachObserverToImages = () => {
  [
    ...document.documentElement.querySelectorAll("img[data-src]:not([data-observed])"),
  ].map((img) => {
    const imgElem = img as HTMLImageElement;
    intersectionObserver.observe(imgElem);
    imgElem.dataset.observed = "true";
  });
};

attachObserverToImages();

const mutationObserver = new MutationObserver((entries) => {
  entries.map((entry) => {
    if (
      [...entry.addedNodes].filter((node) => (node as Element).tagName === "IMG").length
    ) {
      attachObserverToImages();
    }
  });
});

mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

window.addEventListener("unload", () => {
  mutationObserver.disconnect();
  intersectionObserver.disconnect();
});

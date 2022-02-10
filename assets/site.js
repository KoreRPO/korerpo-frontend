const mnml = window.mnml || {};

mnml.listen("click", ".primary-nav__toggle", (ev) => {
  ev.preventDefault();
  document.documentElement.classList.toggle("show-nav");
  ev.target.blur();
});

mnml.listen("click", '.primary-nav a[href^="#"]', (ev) => {
  document.documentElement.classList.remove("show-nav");
});

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        intersectionObserver.unobserve(entry.target);
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
  [...document.documentElement.querySelectorAll("img:not([data-observed])")].map(
    (img) => {
      intersectionObserver.observe(img);
      img.dataset.observed = true;
    }
  );
};

attachObserverToImages();

const mutationObserver = new MutationObserver((entries) => {
  entries.map((entry) => {
    if ([...entry.addedNodes].filter((node) => node.tagName === "IMG").length) {
      attachObserverToImages();
    }
  });
});

mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

window.addEventListener("unload", () => {
  mutationObserver.disconnect();
  intersectionObserver.disconnect();
});

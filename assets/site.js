(() => {
  // node_modules/@dryan-llc/mnml.js/dist/mnml.js
  var mnml = (() => {
    const parser = new DOMParser();
    const isInstance = (thing, kind, param) => {
      if (!(thing instanceof kind)) {
        throw new Error(`Expected ${param} to be a ${kind && kind.constructor && kind.constructor.name}`);
      }
    };
    const isType = (thing, kind, param) => {
      if (typeof thing !== kind) {
        throw new Error(`Expected ${param} to be a ${kind}`);
      }
    };
    const createElementCache = {};
    const createElement = (tagName) => {
      if (!createElementCache[tagName]) {
        createElementCache[tagName] = document.createElement(tagName);
      }
      return createElementCache[tagName].cloneNode();
    };
    const createHTML = (content) => {
      const template = createElement("template");
      isInstance(template, HTMLTemplateElement, "template");
      template.innerHTML = content.trim();
      const output = template.content.firstChild;
      isInstance(output, HTMLElement, "output");
      return output;
    };
    const find = (elem, selector) => {
      if (typeof elem === "string") {
        selector = elem;
        elem = document.documentElement;
      }
      return elem.querySelector(selector);
    };
    const findAll = (elem, selector) => {
      if (typeof elem === "string") {
        selector = elem;
        elem = document.documentElement;
      }
      return [...elem.querySelectorAll(selector)].map((elem2) => elem2);
    };
    const findParent = (elem, selector) => {
      let parent = elem.parentElement;
      if (!parent || !parent.matches) {
        return null;
      }
      while (!parent.matches(selector)) {
        parent = parent.parentElement;
        if (!parent || !parent.matches) {
          parent = null;
          break;
        }
      }
      return parent;
    };
    const findParents = (elem, selector) => {
      const parents = [];
      let parent = elem;
      while (parent = parent.parentElement) {
        if (parent && parent.matches && parent.matches(selector)) {
          parents.push(parent);
        }
      }
      return parents;
    };
    const _findEventTarget = (ev, selector) => {
      return ev.composedPath && ev.composedPath().filter((elem) => {
        const el = elem;
        return el.matches && el.matches(selector);
      }).shift();
    };
    const _loadListener = (callback, priority) => {
      priority = priority || 10;
      if (_loadListener.loaded) {
        return callback();
      }
      _loadListener.queue.push([callback, priority]);
    };
    _loadListener.queue = [];
    _loadListener.loaded = false;
    window.addEventListener("load", () => {
      _loadListener.queue = _loadListener.queue.sort((a, b) => a[1] - b[1]);
      while (_loadListener.queue.length) {
        const cb = _loadListener.queue.shift();
        if (cb) {
          cb[0]();
        }
      }
      _loadListener.loaded = true;
    });
    const _readyListener = (callback, priority) => {
      priority = priority || 10;
      if (_readyListener.loaded) {
        return callback();
      }
      _readyListener.queue.push([callback, priority]);
    };
    _readyListener.queue = [];
    _readyListener.loaded = false;
    document.addEventListener("DOMContentLoaded", () => {
      _readyListener.queue = _readyListener.queue.sort((a, b) => a[1] - b[1]);
      while (_readyListener.queue.length) {
        const cb = _readyListener.queue.shift();
        if (cb) {
          cb[0]();
        }
      }
      _readyListener.loaded = true;
    });
    function listen(eventName, selector, callback, replace) {
      if (typeof replace === "undefined") {
        replace = true;
      }
      if (eventName === "load") {
        if (typeof selector === "function") {
          return _loadListener(selector);
        }
        if (typeof selector !== "number") {
          throw new Error(`Expected selector to be a number but was ${selector && selector.constructor && selector.constructor.name || selector}`);
        }
        const _cb2 = callback;
        return _loadListener(_cb2, selector);
      }
      if (eventName === "ready") {
        if (typeof selector === "function") {
          return _readyListener(selector);
        }
        if (typeof selector !== "number") {
          throw new Error(`Expected selector to be a number but was ${selector && selector.constructor && selector.constructor.name || selector}`);
        }
        const _cb2 = callback;
        return _readyListener(_cb2, selector);
      }
      if (["unload", "beforeunload"].includes(eventName)) {
        if (typeof selector === "function") {
          const _cb2 = selector;
          window.addEventListener(eventName, _cb2);
          return;
        }
      }
      if (typeof selector !== "string") {
        throw new Error(`Expected selector to be a string but was ${selector && selector.constructor && selector.constructor.name || selector}`);
      }
      const _cb = callback;
      if (typeof listen.cache[eventName] === "undefined") {
        listen.cache[eventName] = {};
      }
      if (!(selector in listen.cache[eventName])) {
        listen.cache[eventName][selector] = [];
      }
      if (replace) {
        listen.cache[eventName][selector] = [];
      }
      listen.cache[eventName][selector].push(_cb);
      if (listen.registeredEvents.indexOf(eventName) === -1) {
        listen.registeredEvents.push(eventName);
        document.addEventListener(eventName, (ev) => {
          Object.keys(listen.cache[eventName]).map((s) => {
            const match = _findEventTarget(ev, s);
            if (match) {
              listen.cache[eventName][s].map((cb) => {
                cb(ev, match);
              });
            }
          });
        });
      }
    }
    listen.cache = {};
    listen.registeredEvents = [];
    const uuid = () => {
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (parseInt(c, 10) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> parseInt(c, 10) / 4).toString(16));
    };
    const params = (str = document.location.search) => {
      str = str.replace(/(^\?)/, "");
      if (!str) {
        return {};
      } else if (params.cache[str]) {
        return params.cache[str];
      }
      const _params = new URLSearchParams(str);
      const obj = {};
      [..._params.entries()].map((entry) => {
        const [key, value] = entry;
        if (Object.keys(obj).includes(key) && !Array.isArray(obj[key])) {
          obj[key] = [obj[key]];
        }
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = value;
        }
      });
      return obj;
    };
    params.cache = {};
    return {
      parser,
      createElement,
      createHTML,
      find,
      findAll,
      findParent,
      findParents,
      listen,
      uuid,
      params
    };
  })();
  var mnml_default = mnml;
  if (window) {
    window.mnml = mnml;
  }

  // public/assets/site.ts
  mnml_default.listen("click", ".primary-nav__toggle", (ev, btn) => {
    ev.preventDefault();
    document.documentElement.classList.toggle("show-nav");
    btn.blur();
  });
  mnml_default.listen("click", '.primary-nav a[href^="#"]', () => {
    document.documentElement.classList.remove("show-nav");
  });
  var intersectionObserver = new IntersectionObserver((entries) => {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        if (target.dataset.src) {
          target.src = target.dataset.src;
        }
        intersectionObserver.unobserve(target);
      }
    });
  }, {
    root: document.documentElement,
    rootMargin: "0px",
    threshold: 0.01
  });
  var attachObserverToImages = () => {
    [
      ...document.documentElement.querySelectorAll("img[data-src]:not([data-observed])")
    ].map((img) => {
      const imgElem = img;
      intersectionObserver.observe(imgElem);
      imgElem.dataset.observed = "true";
    });
  };
  attachObserverToImages();
  var mutationObserver = new MutationObserver((entries) => {
    entries.map((entry) => {
      if ([...entry.addedNodes].filter((node) => node.tagName === "IMG").length) {
        attachObserverToImages();
      }
    });
  });
  mutationObserver.observe(document.documentElement, { childList: true, subtree: true });
  mnml_default.listen("beforeunload", () => {
    mutationObserver.disconnect();
    intersectionObserver.disconnect();
  });
})();

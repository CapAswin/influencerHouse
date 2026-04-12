(function () {
  var reduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealOnScroll() {
    var nodes = document.querySelectorAll(".about-reveal");
    if (!nodes.length) return;

    if (reduced || !window.IntersectionObserver) {
      nodes.forEach(function (el) {
        el.classList.add("is-inview");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-inview");
          }
        });
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });
  }

  function jumpNavSpy() {
    var links = document.querySelectorAll(".about-jump-link[href^='#']");
    var items = [];
    links.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) items.push({ link: a, el: el });
    });
    if (!items.length) return;

    function tick() {
      var pad = Math.min(160, Math.round(window.innerHeight * 0.12));
      var pos = window.scrollY + pad;
      var active = items[0];
      for (var i = 0; i < items.length; i++) {
        if (items[i].el.offsetTop <= pos) active = items[i];
      }
      items.forEach(function (item) {
        item.link.classList.toggle("is-active", item === active);
      });
    }

    tick();
    window.addEventListener(
      "scroll",
      function () {
        window.requestAnimationFrame(tick);
      },
      { passive: true }
    );
    window.addEventListener("resize", tick);
  }

  function boot() {
    revealOnScroll();
    jumpNavSpy();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

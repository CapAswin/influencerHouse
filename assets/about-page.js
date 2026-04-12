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

  function boot() {
    revealOnScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

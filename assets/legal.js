(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var sidebar = document.getElementById('legalSidebar');
    var toggle = document.querySelector('.legal-sidebar-toggle');
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.legal-nav__link')
    );
    var sections = links
      .map(function (l) {
        return document.getElementById(l.getAttribute('data-target'));
      })
      .filter(Boolean);
    var topBtn = document.getElementById('legalTopBtn');
    var search = document.getElementById('legalSearch');

    var reduceMotion =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function headerOffset() {
      var header = document.querySelector('.nav-wrap');
      var h = header ? header.getBoundingClientRect().height : 90;
      return h + 16;
    }

    function isMobile() {
      return window.matchMedia('(max-width: 980px)').matches;
    }

    function closeMobileSidebar() {
      if (sidebar && sidebar.classList.contains('is-open')) {
        sidebar.classList.remove('is-open');
        if (toggle) toggle.setAttribute('aria-expanded', 'false');
      }
    }

    /* ----- Mobile sidebar toggle ----- */
    if (toggle && sidebar) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    }

    /* ----- Smooth scroll + offset on link click ----- */
    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var id = link.getAttribute('data-target');
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        var y =
          target.getBoundingClientRect().top +
          window.pageYOffset -
          headerOffset();
        window.scrollTo({
          top: y,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
        if (history.replaceState) history.replaceState(null, '', '#' + id);
        else window.location.hash = id;
        setActive(link);
        if (isMobile()) closeMobileSidebar();
      });
    });

    /* ----- Active link state ----- */
    function setActive(activeLink) {
      links.forEach(function (l) {
        l.classList.toggle('is-active', l === activeLink);
      });
    }

    var linkById = {};
    links.forEach(function (l) {
      linkById[l.getAttribute('data-target')] = l;
    });

    if ('IntersectionObserver' in window && sections.length) {
      var visible = {};
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            visible[entry.target.id] = entry.isIntersecting
              ? entry.intersectionRatio
              : 0;
          });
          var bestId = null;
          var best = 0;
          Object.keys(visible).forEach(function (id) {
            if (visible[id] > best) {
              best = visible[id];
              bestId = id;
            }
          });
          if (bestId && linkById[bestId]) setActive(linkById[bestId]);
        },
        {
          rootMargin: '-' + headerOffset() + 'px 0px -55% 0px',
          threshold: [0, 0.1, 0.25, 0.5, 1]
        }
      );
      sections.forEach(function (s) {
        observer.observe(s);
      });
    }

    /* ----- Deep link on load (account for sticky header) ----- */
    if (window.location.hash) {
      var initial = document.getElementById(
        window.location.hash.slice(1)
      );
      if (initial) {
        setTimeout(function () {
          var y =
            initial.getBoundingClientRect().top +
            window.pageYOffset -
            headerOffset();
          window.scrollTo({ top: y, behavior: 'auto' });
          if (linkById[initial.id]) setActive(linkById[initial.id]);
        }, 60);
      }
    }

    /* ----- Search filter ----- */
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        links.forEach(function (l) {
          var text = (l.textContent || '').toLowerCase();
          l.classList.toggle('is-hidden', q !== '' && text.indexOf(q) === -1);
        });
        document
          .querySelectorAll('.legal-nav__group')
          .forEach(function (group) {
            var anyVisible = group.querySelector(
              '.legal-nav__link:not(.is-hidden)'
            );
            group.style.display = anyVisible ? '' : 'none';
          });
      });
    }

    /* ----- Back to top ----- */
    if (topBtn) {
      topBtn.hidden = false;
      topBtn.classList.remove('is-visible');
      var onScroll = function () {
        if (window.pageYOffset > 600) topBtn.classList.add('is-visible');
        else topBtn.classList.remove('is-visible');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      topBtn.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      });
    }
  });
})();

(function () {
  const headerHTML = `
  <div class="nav-wrap">
    <div class="nav-backdrop" aria-hidden="true"></div>
    <div class="container">
      <nav class="navbar" aria-label="Primary navigation">
        <a class="logo" href="index.html">
          <img class="logo-icon" src="assets/images/favicon.png" alt="Opulent icon" width="36" height="36" />
        </a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open menu">
          <span class="nav-toggle-bar" aria-hidden="true"></span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
        </button>
        <div class="nav-panel" id="primary-navigation">
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="for-brands.html">For Brands</a>
            <a href="for-influencers.html">For Influencers</a>
            <a href="service.html">Services</a>
            <a href="blog.html">Blogs</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="nav-actions">
            <a href="signUp.html" class="btn btn-gold">Sign Up</a>
          </div>
        </div>
      </nav>
    </div>
  </div>`;

  const footerHTML = `
  <footer class="footer" data-shared-footer="true">
    <div class="footer-orb footer-orb-1" aria-hidden="true"></div>
    <div class="footer-orb footer-orb-2" aria-hidden="true"></div>
    <div class="footer-wordmark-bg" aria-hidden="true">
      <span>Opulent</span>
      <span>Influencers</span>
      <span>House</span>
    </div>
    <div class="container footer-content-wrap">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <a href="index.html" aria-label="Go to homepage">
              <img class="footer-main-logo" src="assets/images/white_favIcon.png" alt="Opulent Logo" width="200" height="52" loading="lazy" decoding="async" />
            </a>
          </div>
          <p class="footer-note" style="color:#6a6f84;font-size:13px;line-height:1.5;margin-bottom:20px;">
            Digital influencer infrastructure that helps brands and creators scale campaigns.
          </p>
          <div class="footer-socials">
            <a href="https://www.tiktok.com/@opulentinfluencershouse" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M448,209.9a210.1,210.1,0,0,1-122.8-39.3V349.4A162.6,162.6,0,1,1,185,188.3V278.2a74.6,74.6,0,1,0,52.2,71.2V0l88,0a121.2,121.2,0,0,0,1.9,22.2h0A122.2,122.2,0,0,0,381,102.4a121.4,121.4,0,0,0,67,20.1Z"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61585214585761" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
            </a>
            <a href="https://www.instagram.com/opulentinfluencershouse/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </a>
            <a href="https://snapchat.com/t/r6Pjgsw3" target="_blank" rel="noopener noreferrer" aria-label="Snapchat">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M424.3 325.2c-5.7-3.9-10.4-8-12.7-10.1-4.7-4.2-10-8.9-13.7-13.6-7.1-9-8.4-14.8-1.5-27 10-18.2 24.3-39 23-55.9-1.3-15.6-13.4-19-21.6-19.6-12.7-1-29.6 5.8-54.7 17.5-12 5.5-23 10.6-32.5 14-8.8 3.1-15.8 2.6-21.7-1.4-1.2-.8-21.4-14.4-65.7-14.4s-64.6 13.6-65.7 14.4c-5.9 4-12.8 4.6-21.7 1.4-9.5-3.4-20.5-8.5-32.5-14-25.1-11.7-42-18.4-54.7-17.5-8.2.6-20.4 4-21.6 19.6-1.3 16.9 13.1 37.7 23.1 55.9 6.8 12.2 5.6 18-1.5 27-3.6 4.6-9 9.4-13.6 13.6-2.4 2.1-7 6.2-12.8 10.1C18 342.3.8 358 1 371.3c.4 12.5 13.9 14.8 15.6 15 13 1.9 29.8 1.4 46.5-.4 10.5-1.2 21.2-2.5 32-3 22-1 46.4 11.2 56 16.4 20.8 11.3 49 11.5 72.8 0 9.6-5.2 34-17.4 56-16.4 10.8.5 21.5 1.8 32 3 16.8 1.8 33.6 2.3 46.5.4 1.7-.2 15.2-2.5 15.6-15 .2-13.3-17-29.1-49.7-46.1zM223.8 16c-38.3 0-82.6 19.1-105.8 69.1-10.9 23.4-16.1 48-15.2 71.9 1 25.5 8 50.8 10.6 62.5 3.3 14.8 9.5 22.8 15.6 28 8.1 7.1 19 8.2 23.4 8.7 1.2.2 2 .5 2.5 1 .7.8 1 2 1 3.5 0 2.2-.6 4.9-1.9 8-1.5 3.7-3.8 8.3-6.1 13.5-3.7 8.2-7.8 17.5-7.8 24.3 0 5 2.1 10.4 9 16.9 7.8 7.4 19.4 11.4 34.2 12 18.2.7 34.3-5.2 41.2-8a9.4 9.4 0 0 1 12 5.5l1.3 3.5c1.4-1 6.5-4.4 16.9-4.4 10.4 0 15.5 3.4 16.9 4.4l1.3-3.6a9.5 9.5 0 0 1 12-5.4c6.9 2.8 22.9 8.6 41.1 8 14.8-.6 26.4-4.6 34.2-12 6.9-6.5 9-11.9 9-16.9 0-6.8-4-16.1-7.8-24.3-2.3-5.2-4.6-9.8-6.1-13.5-1.3-3-1.9-5.8-1.9-8 0-1.5.3-2.7 1-3.5.5-.6 1.3-1 2.5-1 4.5-.4 15.3-1.6 23.4-8.7 6.1-5.3 12.3-13.2 15.6-28 2.6-11.7 9.6-37 10.6-62.5.9-23.9-4.3-48.4-15.2-71.9C306.4 35.1 262.1 16 223.8 16z"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-nav-col">
          <strong>Browse Categories</strong>
          <nav aria-label="Category navigation">
            <a href="about.html">About Us</a>
            <a href="for-brands.html">For Brands</a>
            <a href="for-influencers.html">For Influencers</a>
            <a href="service.html">Services</a>
            <a href="blog.html">Blogs</a>
            <a href="contact.html">Contact Us</a>
          </nav>
        </div>

        <div class="footer-contact-details" style="display:flex;flex-direction:column;gap:16px;">
          <strong style="display:block;color:#ffffff;font-size:16px;font-weight:600;">Get in Touch</strong>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 512 512" style="margin-top:2px;"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            <a href="mailto:info@ulegendarydigital.com" style="color:#8c95a8;font-size:13px;text-decoration:none;">info@ulegendarydigital.com</a>
          </div>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 512 512" style="margin-top:2px;"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
            <a href="tel:971556173798" style="color:#8c95a8;font-size:13px;text-decoration:none;">+971 55 617 3798</a>
          </div>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 384 512" style="margin-top:2px;flex-shrink:0;"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
            <span style="color:#8c95a8;font-size:13px;line-height:1.5;">Office # 803 - 8th Floor, White Swan Building, Trade Centre District, Sheikh Zayed Road, Dubai, UAE.</span>
          </div>
        </div>

        <div class="footer-newsletter">
          <strong>Newsletter</strong>
          <form class="newsletter-form" action="#" aria-label="Newsletter form" style="margin-bottom:24px;">
            <input type="email" name="newsletter_email" placeholder="Email Address" required />
            <button type="submit" aria-label="Subscribe">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </form>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-base">
        <div class="footer-copy">Copyright ©2026 Developed by Ulegendary Digital</div>
        <div class="footer-legal">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>`;

  // Inject header early to avoid nav flash/layout shift
  const headerEl = document.getElementById('site-header');
  if (headerEl) headerEl.outerHTML = headerHTML;

  // Inject footer when the browser is idle (below-the-fold, non-critical for first paint)
  const footerEl = document.getElementById('site-footer');
  let footerAnimationsInitialized = false;
  function injectFooter() {
    if (!footerEl) return;
    footerEl.outerHTML = footerHTML;
    initFooterAnimations();
  }
  if (footerEl) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(injectFooter, { timeout: 1200 });
    } else {
      setTimeout(injectFooter, 400);
    }
  }

  // Set active nav link based on current page
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === page);
  });

  (function initStickyNavState() {
    const navWrap = document.querySelector('.nav-wrap');
    if (!navWrap) return;

    let stickyRaf = null;
    function updateStickyState() {
      stickyRaf = null;
      navWrap.classList.toggle('is-scrolled', window.scrollY > 12);
    }

    function onScroll() {
      if (stickyRaf !== null) return;
      stickyRaf = requestAnimationFrame(updateStickyState);
    }

    updateStickyState();
    window.addEventListener('scroll', onScroll, { passive: true });
  })();

  (function initMobileNav() {
    const nav = document.querySelector('.navbar');
    const btn = document.querySelector('.nav-toggle');
    const panel = document.getElementById('primary-navigation');
    const backdrop = document.querySelector('.nav-backdrop');
    if (!nav || !btn || !panel) return;

    function setOpen(open) {
      nav.classList.toggle('nav-is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', open);
    }

    btn.addEventListener('click', function () {
      setOpen(!nav.classList.contains('nav-is-open'));
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        setOpen(false);
      });
    }

    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });

    var mq = window.matchMedia('(min-width: 901px)');
    function onMq() {
      if (mq.matches) setOpen(false);
    }
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onMq);
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(onMq);
    }
    window.addEventListener('resize', onMq);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  })();

  // Footer animations
  function initFooterAnimations() {
    if (footerAnimationsInitialized) return;
    const footer = document.querySelector('[data-shared-footer="true"]');
    if (!footer) return;
    footerAnimationsInitialized = true;
    const wordmark = footer.querySelector('.footer-wordmark-bg');
    const orb1 = footer.querySelector('.footer-orb-1');
    const orb2 = footer.querySelector('.footer-orb-2');
    const content = footer.querySelector('.footer-content-wrap');
    const cols = footer.querySelectorAll('.footer-grid > *');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    let footerScrollRaf = null;
    function onScroll() {
      if (reduced.matches || !wordmark) return;
      if (footerScrollRaf !== null) return;
      footerScrollRaf = requestAnimationFrame(() => {
        footerScrollRaf = null;
        const rect = footer.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top > vh + 120 || rect.bottom < -120) return;
        const scrolled = vh - rect.top;
        if (scrolled > 0) {
          const viewportWidth = window.innerWidth;
          const isTabletLaptopRange = viewportWidth <= 1050 && viewportWidth >= 900;
          const wordmarkBaseOffset = isTabletLaptopRange ? -42 : 0;
          const wordmarkParallaxFactor = isTabletLaptopRange ? 0.32 : 0.38;
          wordmark.style.transform = `translate3d(0, ${wordmarkBaseOffset + scrolled * wordmarkParallaxFactor}px, 0)`;
          if (orb1) orb1.style.transform = `translate3d(0, ${scrolled * 0.18}px, 0)`;
          if (orb2) orb2.style.transform = `translate3d(0, ${scrolled * -0.12}px, 0)`;
        }
      });
    }

    function syncParallaxNow() {
      onScroll();
      requestAnimationFrame(onScroll);
    }

    function resetFooterParallaxTransforms() {
      if (wordmark) wordmark.style.transform = '';
      if (orb1) orb1.style.transform = '';
      if (orb2) orb2.style.transform = '';
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          cols.forEach((col, i) => setTimeout(() => col.classList.add('footer-visible'), i * 110));
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });
    if (cols.length) io.observe(footer);

    footer.addEventListener('mousemove', (e) => {
      if (reduced.matches || !content) return;
      const r = footer.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      content.style.transform = `rotateY(${cx * 2.5}deg) rotateX(${-cy * 1.5}deg)`;
      content.style.transition = 'transform 0.1s ease';
      if (orb1) orb1.style.transform = `translate(${cx * 22}px, ${cy * 14}px)`;
      if (orb2) orb2.style.transform = `translate(${cx * -18}px, ${cy * -10}px)`;
    });

    footer.addEventListener('mouseleave', () => {
      if (content) { content.style.transition = 'transform 0.6s ease'; content.style.transform = ''; }
      if (orb1) orb1.style.transform = '';
      if (orb2) orb2.style.transform = '';
    });

    // Attach footer parallax while footer is near the viewport to avoid
    // unnecessary RAF + getBoundingClientRect work on long pages.
    const shouldAlwaysAttachParallax = window.matchMedia('(max-width: 1050px)').matches;
    if ('IntersectionObserver' in window && !shouldAlwaysAttachParallax) {
      let parallaxScrollAttached = false;
      function attachParallaxScroll() {
        if (parallaxScrollAttached) return;
        parallaxScrollAttached = true;
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        window.addEventListener('orientationchange', onScroll, { passive: true });
        syncParallaxNow();
      }
      function detachParallaxScroll() {
        if (!parallaxScrollAttached) return;
        parallaxScrollAttached = false;
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        window.removeEventListener('orientationchange', onScroll);
        if (footerScrollRaf !== null) {
          cancelAnimationFrame(footerScrollRaf);
          footerScrollRaf = null;
        }
        resetFooterParallaxTransforms();
      }
      const parallaxNearIo = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) attachParallaxScroll();
            else detachParallaxScroll();
          });
        },
        { root: null, rootMargin: '0px 0px 45% 0px', threshold: 0 }
      );
      parallaxNearIo.observe(footer);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      window.addEventListener('orientationchange', onScroll, { passive: true });
      syncParallaxNow();
    }
  }

  initFooterAnimations();

  // Premium smooth scrolling (Lenis) — disabled when user prefers reduced motion
  (function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    // Skip on lower-powered devices to reduce Total Blocking Time.
    if ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4)) return;

    // Blog article: native scroll — Lenis + sticky sidebar often causes initial wheel lag
    // and jank; long-form reading matches OS scrolling better.
    if (document.body.classList.contains('blog-detail-page')) return;

    const lenis = new Lenis({
      autoRaf: true,
      // Slightly higher lerp converges in fewer frames — less main-thread churn on long scrolls.
      lerp: 0.1,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      smoothWheel: true,
      // Native touch momentum avoids Lenis fighting the browser (common source of scroll jank).
      syncTouch: false,
      syncTouchLerp: 0.075,
    });
    window.lenis = lenis;

    function anchorOffset() {
      const nav = document.querySelector('.navbar');
      return nav ? Math.round(nav.getBoundingClientRect().height + 20) : 96;
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
      const href = a.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      a.addEventListener('click', e => {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -anchorOffset() });
      });
    });

    if (location.hash && location.hash.length > 1) {
      const deep = document.getElementById(location.hash.slice(1));
      if (deep) {
        requestAnimationFrame(() => {
          lenis.scrollTo(deep, { offset: -anchorOffset(), immediate: true });
        });
      }
    }
  })();
})();

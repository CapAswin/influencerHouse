(function () {
  const headerHTML = `
  <div class="nav-wrap">
    <div class="container">
      <nav class="navbar" aria-label="Primary navigation">
        <a class="logo creova-logo" href="index.html" aria-label="CREOVA">
          <img class="creova-logo-img" src="assets/images/logos/logo.png" alt="" width="140" height="40" decoding="async" />
        </a>
        <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-navigation" aria-label="Open menu">
          <span class="nav-toggle-bar" aria-hidden="true"></span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
          <span class="nav-toggle-bar" aria-hidden="true"></span>
        </button>
        <div class="nav-panel" aria-label="Primary navigation links">
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="for-brands.html">For Brands</a>
            <a href="for-influencers.html">For Influencers</a>
            <a href="service.html">Services</a>
            <a href="blog.html">Blog</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="nav-actions">
            <a href="signUp.html" class="btn btn-gold">Sign Up</a>
          </div>
        </div>
      </nav>
    </div>
    <dialog class="nav-dialog" id="primary-navigation" aria-label="Menu">
      <div class="nav-dialog-surface">
        <button type="button" class="nav-dialog-close" aria-label="Close menu">
          <span aria-hidden="true">×</span>
        </button>
        <div class="nav-panel">
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="for-brands.html">For Brands</a>
            <a href="for-influencers.html">For Influencers</a>
            <a href="service.html">Services</a>
            <a href="blog.html">Blog</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="nav-actions">
            <a href="signUp.html" class="btn btn-gold">Sign Up</a>
          </div>
        </div>
      </div>
    </dialog>
  </div>`;

  const footerHTML = `
  <footer class="footer" data-shared-footer="true">
    <div class="footer-orb footer-orb-1" aria-hidden="true"></div>
    <div class="footer-orb footer-orb-2" aria-hidden="true"></div>
    <div class="footer-wordmark-bg" aria-hidden="true">
      <span class="footer-wordmark-text">CREOVA<span class="creova-logo-star" aria-hidden="true">✼</span></span>
    </div>
    <div class="container footer-content-wrap">
      <div class="footer-grid">
        <div class="footer-brand-col">
          <div class="footer-brand">
            <a class="creova-logo creova-logo--footer" href="index.html" aria-label="Go to homepage">
              <img class="creova-logo-img creova-logo-img--footer" src="assets/images/logos/footer_logo.png" alt="" width="160" height="48" decoding="async" />
            </a>
          </div>
          <p class="footer-note" style="color:#6a6f84;font-size:13px;line-height:1.5;margin-bottom:20px;">
            Digital influencer infrastructure that helps brands and creators scale campaigns.
          </p>
          <div class="footer-socials">
            <a href="#" aria-label="TikTok">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M448,209.9a210.1,210.1,0,0,1-122.8-39.3V349.4A162.6,162.6,0,1,1,185,188.3V278.2a74.6,74.6,0,1,0,52.2,71.2V0l88,0a121.2,121.2,0,0,0,1.9,22.2h0A122.2,122.2,0,0,0,381,102.4a121.4,121.4,0,0,0,67,20.1Z"/></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg viewBox="0 0 320 512" width="16" height="16" fill="currentColor"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg viewBox="0 0 448 512" width="16" height="16" fill="currentColor"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </a>
            <a href="#" aria-label="Snapchat">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M15.943 11.526c-.111-.303-.323-.465-.564-.599a1 1 0 0 0-.123-.064l-.219-.111c-.752-.399-1.339-.902-1.746-1.498a3.4 3.4 0 0 1-.3-.531c-.034-.1-.032-.156-.008-.207a.3.3 0 0 1 .097-.1c.129-.086.262-.173.352-.231.162-.104.289-.187.371-.245.309-.216.525-.446.66-.702a1.4 1.4 0 0 0 .069-1.16c-.205-.538-.713-.872-1.329-.872a1.8 1.8 0 0 0-.487.065c.006-.368-.002-.757-.035-1.139-.116-1.344-.587-2.048-1.077-2.61a4.3 4.3 0 0 0-1.095-.881C9.764.216 8.92 0 7.999 0s-1.76.216-2.505.641c-.412.232-.782.53-1.097.883-.49.562-.96 1.267-1.077 2.61-.033.382-.04.772-.036 1.138a1.8 1.8 0 0 0-.487-.065c-.615 0-1.124.335-1.328.873a1.4 1.4 0 0 0 .067 1.161c.136.256.352.486.66.701.082.058.21.14.371.246l.339.221a.4.4 0 0 1 .109.11c.026.053.027.11-.012.217a3.4 3.4 0 0 1-.295.52c-.398.583-.968 1.077-1.696 1.472-.385.204-.786.34-.955.8-.128.348-.044.743.28 1.075q.18.189.409.31a4.4 4.4 0 0 0 1 .4.7.7 0 0 1 .202.09c.118.104.102.26.259.488q.12.178.296.3c.33.229.701.243 1.095.258.355.014.758.03 1.217.18.19.064.389.186.618.328.55.338 1.305.802 2.566.802 1.262 0 2.02-.466 2.576-.806.227-.14.424-.26.609-.321.46-.152.863-.168 1.218-.181.393-.015.764-.03 1.095-.258a1.14 1.14 0 0 0 .336-.368c.114-.192.11-.327.217-.42a.6.6 0 0 1 .19-.087 4.5 4.5 0 0 0 1.014-.404c.16-.087.306-.2.429-.336l.004-.005c.304-.325.38-.709.256-1.047m-1.121.602c-.684.378-1.139.337-1.493.565-.3.193-.122.61-.34.76-.269.186-1.061-.012-2.085.326-.845.279-1.384 1.082-2.903 1.082s-2.045-.801-2.904-1.084c-1.022-.338-1.816-.14-2.084-.325-.218-.15-.041-.568-.341-.761-.354-.228-.809-.187-1.492-.563-.436-.24-.189-.39-.044-.46 2.478-1.199 2.873-3.05 2.89-3.188.022-.166.045-.297-.138-.466-.177-.164-.962-.65-1.18-.802-.36-.252-.52-.503-.402-.812.082-.214.281-.295.49-.295a1 1 0 0 1 .197.022c.396.086.78.285 1.002.338q.04.01.082.011c.118 0 .16-.06.152-.195-.026-.433-.087-1.277-.019-2.066.094-1.084.444-1.622.859-2.097.2-.229 1.137-1.22 2.93-1.22 1.792 0 2.732.987 2.931 1.215.416.475.766 1.013.859 2.098.068.788.009 1.632-.019 2.065-.01.142.034.195.152.195a.4.4 0 0 0 .082-.01c.222-.054.607-.253 1.002-.338a1 1 0 0 1 .197-.023c.21 0 .409.082.49.295.117.309-.04.56-.401.812-.218.152-1.003.638-1.18.802-.184.169-.16.3-.139.466.018.14.413 1.991 2.89 3.189.147.073.394.222-.041.464"/>
              </svg>
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
            <a href="blog.html">Blog</a>
            <a href="contact.html">Contact Us</a>
            <a href="faq-brands.html">FAQ – Brands</a>
            <a href="faq-influencers.html">FAQ – Influencers</a>
          </nav>
        </div>

        <div class="footer-contact-details" style="display:flex;flex-direction:column;gap:16px;">
          <strong style="display:block;color:#ffffff;font-size:16px;font-weight:600;">Get in Touch</strong>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 512 512" style="margin-top:2px;"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
            <a href="mailto:creovauae@gmail.com" style="color:#8c95a8;font-size:13px;text-decoration:none;">creovauae@gmail.com</a>
          </div>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 512 512" style="margin-top:2px;"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
            <a href="tel:+971547235899" style="color:#8c95a8;font-size:13px;text-decoration:none;">+971547235899</a>
          </div>
          <div class="contact-item" style="display:flex;gap:10px;align-items:flex-start;">
            <svg width="16" height="16" fill="var(--primary)" viewBox="0 0 384 512" style="margin-top:2px;flex-shrink:0;"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
            <span style="color:#8c95a8;font-size:13px;line-height:1.5;">Dubai, United Arab Emirates.</span>
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
        <div class="footer-copy">Copyright ©2026 Developed by CREOVA Digital <span class="footer-version">v${window.APP_VERSION}</span></div>
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
    initNewsletterCapture();
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
    const dialog = document.getElementById('primary-navigation');
    if (!nav || !btn || !dialog) return;
    const closeBtn = dialog.querySelector('.nav-dialog-close');
    const panel = dialog.querySelector('.nav-panel');
    if (!panel) return;

    function setOpen(open) {
      const next = Boolean(open);
      nav.classList.toggle('nav-is-open', next);
      btn.setAttribute('aria-expanded', next ? 'true' : 'false');
      btn.setAttribute('aria-label', next ? 'Close menu' : 'Open menu');
      document.body.classList.toggle('nav-open', next);

      const isDialogOpen = dialog.hasAttribute('open');
      if (next && !isDialogOpen) {
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
      } else if (!next && isDialogOpen) {
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
      }
    }

    btn.addEventListener('click', function () {
      setOpen(!dialog.hasAttribute('open'));
    });

    if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));

    dialog.addEventListener('click', (e) => {
      // Close when clicking the backdrop (outside surface)
      if (e.target === dialog) setOpen(false);
    });

    dialog.addEventListener('cancel', (e) => {
      // Keep state in sync with our nav button animation.
      e.preventDefault();
      setOpen(false);
    });

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

    const wordmarkText = wordmark ? wordmark.querySelector('.footer-wordmark-text') : null;

    let footerScrollRaf = null;
    function onScroll() {
      if (reduced.matches || !wordmark) return;
      if (footerScrollRaf !== null) return;
      footerScrollRaf = requestAnimationFrame(() => {
        footerScrollRaf = null;
        const rect = footer.getBoundingClientRect();
        const vh = window.innerHeight;
        if (rect.top > vh + 120 || rect.bottom < -120) return;

        const footerHeight = rect.height;
        const scrolled = Math.max(0, vh - rect.top);
        const textHeight = wordmarkText
          ? wordmarkText.getBoundingClientRect().height
          : footerHeight * 0.35;
        const maxTravel = Math.max(0, footerHeight - textHeight * 0.82);

        const viewportWidth = window.innerWidth;
        const isTabletLaptopRange = viewportWidth <= 1050 && viewportWidth >= 900;
        const wordmarkParallaxFactor = isTabletLaptopRange ? 0.42 : 0.48;
        const parallaxOffset = Math.min(scrolled * wordmarkParallaxFactor, maxTravel);
        const parallaxY = parallaxOffset > 0 ? -parallaxOffset : 0;

        wordmark.style.transform = parallaxY
          ? `translate3d(0, ${parallaxY}px, 0)`
          : '';

        if (scrolled > 0) {
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

  const NEWSLETTER_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwJNOA8aD4gq4KjvH-UtfwdKXbBB_-LgUSjuQC0cpVIOpnUVOOsm9S816qYpxbn69bBOg/exec";

  function initNewsletterCapture() {
    var footer = document.querySelector('[data-shared-footer="true"]');
    if (!footer) return;
    var form = footer.querySelector('form.newsletter-form');
    if (!form || form.__newsletterBound) return;
    form.__newsletterBound = true;

    var emailInput = form.querySelector('input[type="email"][name="newsletter_email"]');

    function ensureSnackbarStack() {
      var existing = document.getElementById('signup-snackbar-stack');
      if (existing) return existing;
      var stack = document.createElement('div');
      stack.id = 'signup-snackbar-stack';
      stack.className = 'signup-snackbar-stack';
      document.body.appendChild(stack);
      return stack;
    }

    var snackbarStack = ensureSnackbarStack();
    var SNACKBAR_EXIT_MS = 320;
    var MAX_SNACKBARS = 3;
    function showSnackbar(opts) {
      if (!snackbarStack) return;
      var data = opts || {};
      var type = data.type || 'info';
      var message = data.message || 'Message';
      var actionLabel = data.actionLabel || 'OK';
      var duration = typeof data.duration === 'number' ? data.duration : 4200;
      var onAction = typeof data.onAction === 'function' ? data.onAction : null;

      var snackbar = document.createElement('article');
      snackbar.className = 'signup-snackbar signup-snackbar--' + type;
      snackbar.classList.add('is-new');
      snackbar.setAttribute('role', 'status');

      var icon = document.createElement('span');
      icon.className = 'signup-snackbar-icon';
      icon.setAttribute('aria-hidden', 'true');

      var text = document.createElement('p');
      text.className = 'signup-snackbar-text';
      text.textContent = message;

      var actionButton = document.createElement('button');
      actionButton.type = 'button';
      actionButton.className = 'signup-snackbar-action';
      actionButton.textContent = actionLabel;

      var closeButton = document.createElement('button');
      closeButton.type = 'button';
      closeButton.className = 'signup-snackbar-close';
      closeButton.setAttribute('aria-label', 'Dismiss message');
      closeButton.textContent = '×';

      var removed = false;
      function removeSnackbar() {
        if (removed) return;
        removed = true;
        snackbar.classList.remove('is-visible');
        snackbar.classList.add('is-exit');
        setTimeout(function () {
          if (snackbar.parentNode) snackbar.parentNode.removeChild(snackbar);
        }, SNACKBAR_EXIT_MS);
      }

      actionButton.addEventListener('click', function () {
        if (onAction) onAction();
        removeSnackbar();
      });
      closeButton.addEventListener('click', removeSnackbar);

      snackbar.appendChild(icon);
      snackbar.appendChild(text);
      snackbar.appendChild(actionButton);
      snackbar.appendChild(closeButton);
      snackbarStack.prepend(snackbar);

      requestAnimationFrame(function () {
        snackbar.classList.add('is-visible');
        snackbar.classList.remove('is-new');
      });

      var active = snackbarStack.querySelectorAll('.signup-snackbar:not(.is-exit)');
      if (active.length > MAX_SNACKBARS) {
        var oldest = active[active.length - 1];
        if (oldest && oldest !== snackbar) oldest.remove();
      }
      setTimeout(removeSnackbar, duration);
    }

    function normalizeEmail(raw) {
      return String(raw || '').trim().toLowerCase();
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = normalizeEmail(emailInput ? emailInput.value : '');
      if (!email) {
        showSnackbar({
          type: 'error',
          message: 'Please enter your email.',
          actionLabel: 'Fix',
          onAction: function () { if (emailInput) emailInput.focus(); }
        });
        if (emailInput) emailInput.focus();
        return;
      }

      showSnackbar({
        type: "info",
        message: "Subscribing…",
        actionLabel: "Wait",
        duration: 1800
      });

      try {
        await fetch(NEWSLETTER_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            email: email,
            subject: "newsletter subscribe",
            message: "newsletter subscribe from footer",
            submittedAt: new Date().toISOString(),
          }),
        });
        showSnackbar({
          type: "success",
          message: "Subscribed.",
          actionLabel: "OK"
        });
        try { if (emailInput) emailInput.value = ""; } catch (_) {}
      } catch (err) {
        showSnackbar({
          type: "error",
          message: (err && err.message) ? String(err.message) : "Subscription failed. Please try again.",
          actionLabel: "Retry"
        });
      }
    });
  }

  // Premium smooth scrolling (Lenis) - disabled when user prefers reduced motion
  (function initSmoothScroll() {
    if (typeof Lenis === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    // Skip on lower-powered devices to reduce Total Blocking Time.
    if ((navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory <= 4)) return;

    // Blog article: native scroll - Lenis + sticky sidebar often causes initial wheel lag
    // and jank; long-form reading matches OS scrolling better.
    if (document.body.classList.contains('blog-detail-page')) return;

    const lenis = new Lenis({
      autoRaf: true,
      // Slightly higher lerp converges in fewer frames - less main-thread churn on long scrolls.
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

  // Required-field markers (all forms)
  function syncRequiredAsterisks(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const labels = scope.querySelectorAll('label');
    labels.forEach(label => {
      const controls = label.querySelectorAll('input, select, textarea');
      const hasRequired = Array.from(controls).some(control => {
        if (!control || control.disabled) return false;
        const type = (control.getAttribute('type') || '').toLowerCase();
        if (type === 'hidden' || type === 'button' || type === 'submit' || type === 'reset') return false;
        return control.hasAttribute('required');
      });

      const title =
        label.querySelector('span') ||
        label.querySelector('.label-text') ||
        null;
      if (!title) return;

      let star = title.querySelector('.required-asterisk');
      if (hasRequired) {
        if (!star) {
          star = document.createElement('span');
          star.className = 'required-asterisk';
          title.appendChild(star);
        }
        star.textContent = '✼';
      } else if (star) {
        star.remove();
      }
    });
  }

  window.__syncRequiredAsterisks = syncRequiredAsterisks;
  syncRequiredAsterisks(document);

  // --- API helpers (subscription plans + country list) ---
  const REMOTE_API_BASE_URL =
    window.API_BASE_URL ||
    'https://creovauae.com/app-api';
  const API_BASE_URL = `${window.CORS_PROXY || ''}${REMOTE_API_BASE_URL}`;
  function getApiToken() {
    try {
      return (
        (window && window.AUTH_TOKEN) ||
        (new URLSearchParams(window.location.search).get('token') || '') ||
        localStorage.getItem('token') ||
        localStorage.getItem('authToken') ||
        localStorage.getItem('access_token') ||
        sessionStorage.getItem('token') ||
        ''
      );
    } catch (_) {
      return '';
    }
  }

  const API_RESPONSE_STORE = {
    data: Object.create(null),
    pending: Object.create(null),
    get(key) {
      return Object.prototype.hasOwnProperty.call(this.data, key)
        ? this.data[key]
        : undefined;
    },
    set(key, value) {
      this.data[key] = value;
      return value;
    },
    has(key) {
      return Object.prototype.hasOwnProperty.call(this.data, key);
    },
    clear(key) {
      if (typeof key === 'string') {
        delete this.data[key];
        delete this.pending[key];
        return;
      }
      this.data = Object.create(null);
      this.pending = Object.create(null);
    },
    async remember(key, loader) {
      if (this.has(key)) {
        return this.get(key);
      }
      if (this.pending[key]) {
        return this.pending[key];
      }

      const request = Promise.resolve()
        .then(loader)
        .then((value) => {
          this.set(key, value);
          delete this.pending[key];
          return value;
        })
        .catch((error) => {
          delete this.pending[key];
          throw error;
        });

      this.pending[key] = request;
      return request;
    }
  };

  function buildApiHeaders(contentType) {
    const token = getApiToken();
    const headers = { Accept: 'application/json' };
    if (contentType) headers['Content-Type'] = contentType;
    if (token) headers.Authorization = `Bearer ${token}`;
    return headers;
  }

  async function parseApiResponse(res) {
    const json = await res.json().catch(() => null);
    if (res.ok) return json;
    throw new Error((json && (json.error || json.message)) || 'API failed');
  }

  async function requestApi(method, urlOrPath, options = {}) {
    const isFormData = options.body instanceof FormData;
    const headers = buildApiHeaders(isFormData ? null : options.contentType || null);
    const url = `${API_BASE_URL}${urlOrPath}`;
    const requestOptions = { method, headers };

    if (Object.prototype.hasOwnProperty.call(options, 'body')) {
      requestOptions.body = isFormData
        ? options.body
        : options.contentType === 'application/json'
          ? JSON.stringify(options.body || {})
          : options.body;
    }

    const res = await fetch(url, requestOptions);
    return parseApiResponse(res);
  }

  function apiGetJson(urlOrPath, cacheKey) {
    const load = function () {
      return requestApi('GET', urlOrPath);
    };
    return cacheKey ? API_RESPONSE_STORE.remember(cacheKey, load) : load();
  }

  function apiSendJson(method, urlOrPath, body, options = {}) {
    const load = function () {
      return requestApi(method, urlOrPath, {
        body,
        contentType: 'application/json'
      });
    };

    const request = options.cacheKey
      ? API_RESPONSE_STORE.remember(options.cacheKey, load)
      : load();

    return request.then(function (response) {
      if (options.storeKey) {
        API_RESPONSE_STORE.set(options.storeKey, response);
      }
      return response;
    });
  }

  function apiSendFormData(method, urlOrPath, formData, storeKey) {
    return requestApi(method, urlOrPath, { body: formData }).then(function (response) {
      if (storeKey) {
        API_RESPONSE_STORE.set(storeKey, response);
      }
      return response;
    });
  }

  function fetchSubscriptionPlans(usertype = 0) {
    const qs = `?usertype=${encodeURIComponent(String(usertype))}`;
    return apiGetJson(`/subscription-plans${qs}`, `subscription-plans:${String(usertype)}`);
  }

  function fetchCountries() {
    // IMPORTANT: country/ returns 500 on server; use /country (no trailing slash).
    return apiGetJson('/country', 'countries');
  }

  window.API_CLIENT = {
    store: API_RESPONSE_STORE,
    fetchSubscriptionPlans,
    fetchCountries,
    fetchProvinces: function (countryId) {
      const normalizedCountryId = Number(countryId);
      return apiSendJson(
        'POST',
        '/province',
        { country_id: normalizedCountryId },
        {
          cacheKey: `provinces:${String(normalizedCountryId)}`,
          storeKey: `provinces:${String(normalizedCountryId)}`
        }
      );
    },
    fetchCategories: function () {
      return apiGetJson('/category', 'categories');
    },
    fetchBrandSizes: function () {
      return apiGetJson('/brand-size', 'brand-sizes');
    },
    fetchNiches: function (categoryId) {
      const normalizedCategoryId = Number(categoryId);
      return apiSendJson(
        'POST',
        '/niche',
        { category_id: normalizedCategoryId },
        {
          cacheKey: `niches:${String(normalizedCategoryId)}`,
          storeKey: `niches:${String(normalizedCategoryId)}`
        }
      );
    },
    influencerTellUs: function (payload) {
      if (payload instanceof FormData) {
        return apiSendFormData('POST', '/influencers/tell-us', payload, 'influencerTellUs:last');
      }
      return apiSendJson('POST', '/influencers/tell-us', payload, { storeKey: 'influencerTellUs:last' });
    },
    brandTellUs: function (payload) {
      if (payload instanceof FormData) {
        return apiSendFormData('POST', '/brand/register', payload, 'brandTellUs:last');
      }
      return apiSendJson('POST', '/brand/register', payload, { storeKey: 'brandTellUs:last' });
    },
    signup: function (payload) {
      return apiSendJson('POST', '/signup', payload, { storeKey: 'signup:last' });
    },
    submitOtp: function (payload) {
      return apiSendJson('POST', '/signup', payload, { storeKey: 'signup:otp:last' });
    },
    resendOtp: function (payload) {
      return apiSendJson('POST', '/signup', payload, { storeKey: 'resend-otp:last' });
    },
    submitContact: function (payload) {
      return apiSendJson('POST', '/contact', payload, { storeKey: 'contact:last' });
    },
  };
})();

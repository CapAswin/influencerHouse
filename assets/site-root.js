(function (global) {
  const PAGE_SLUGS = new Set([
    'index',
    'about',
    'for-brands',
    'for-influencers',
    'service',
    'blog',
    'contact',
    'signUp',
    'signup',
    'faq-brands',
    'faq-influencers',
    '404',
  ]);

  function normalizeSlug(segment) {
    if (!segment) return 'index';
    const slug = String(segment).replace(/\.html$/i, '');
    if (slug.toLowerCase() === 'signup') return 'signUp';
    return slug;
  }

  function getSiteRoot() {
    if (typeof global.SITE_ROOT === 'string') {
      return global.SITE_ROOT.replace(/\/$/, '');
    }
    const parts = global.location.pathname.split('/').filter(Boolean);
    if (!parts.length) return '';
    const slug = normalizeSlug(parts[parts.length - 1]);
    const isKnownPage =
      PAGE_SLUGS.has(slug) || PAGE_SLUGS.has(slug.toLowerCase());
    if (isKnownPage) {
      return parts.length > 1 ? '/' + parts.slice(0, -1).join('/') : '';
    }
    return '/' + parts.join('');
  }

  function sitePath(slug) {
    const root = getSiteRoot();
    if (!slug || slug === 'index') {
      const home = (root || '') + '/';
      return home.replace(/\/{2,}/g, '/') || '/';
    }
    return ((root || '') + '/' + slug).replace(/\/{2,}/g, '/');
  }

  function currentPageSlug() {
    return normalizeSlug(global.location.pathname.split('/').pop() || 'index');
  }

  global.normalizeSlug = normalizeSlug;
  global.getSiteRoot = getSiteRoot;
  global.sitePath = sitePath;
  global.currentPageSlug = currentPageSlug;
})(window);

/* Local translations: no network translation service is used by visitors. */
(() => {
  'use strict';
  const data = window.SiteTranslations;
  if (!data) return;
  const languages = ['en', 'ja', 'es'];
  const normalize = text => text.replace(/\s+/gu, ' ').trim();
  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const defaultLanguage = data.defaultLanguage || 'en';
  let language = defaultLanguage;
  let observer;
  const excluded = 'script, style, code, [translate="no"], .demo-highlight, #site-language-picker, [data-i18n-years]';
  function translate(text) {
    const key = normalize(text);
    return Object.hasOwn(data.strings, key) ? data.strings[key][languages.indexOf(language)] : text;
  }
  function fromURL() {
    const value = new URL(location.href).searchParams.get('lang');
    return languages.includes(value) ? value : defaultLanguage;
  }
  function translateLinks() {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.getAttribute('href'), location.href);
      if (!['http:', 'https:', 'file:'].includes(url.protocol)) return;
      if (url.origin !== location.origin && url.hostname !== 'amigojapan.github.io') return;
      let path = decodeURIComponent(url.pathname);
      if (url.protocol === 'file:') path = path.slice(new URL('../', document.querySelector('script[src$="site-i18n.js"]').src).pathname.length);
      else path = path.replace(/^\//u, '');
      if (path === '' || path.endsWith('/')) path += 'index.html';
      if (path === 'Japanese_Haggada') path += '/index.html';
      if (!data.pages.includes(path)) return;
      url.searchParams.set('lang', language);
      link.href = url.href;
    });
  }
  function render() {
    if (observer) observer.disconnect();
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement || node.parentElement.closest(excluded)) continue;
      if (!normalize(node.nodeValue)) continue;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const value = translate(original);
      // Keep source whitespace, which separates inline links and emphasized words.
      if (value !== original && value !== normalize(original)) node.nodeValue = original.match(/^\s*/u)[0] + value + original.match(/\s*$/u)[0];
      else node.nodeValue = original;
    }
    document.querySelectorAll('[alt], [title], [aria-label], [placeholder]').forEach(element => {
      if (element.closest(excluded)) return;
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, Object.fromEntries(['alt', 'title', 'aria-label', 'placeholder'].filter(a => element.hasAttribute(a)).map(a => [a, element.getAttribute(a)])));
      }
      for (const [attribute, value] of Object.entries(originalAttributes.get(element))) element.setAttribute(attribute, translate(value));
    });
    document.querySelectorAll('[data-i18n-years]').forEach(element => {
      const years = Math.floor((Date.now() - new Date('2002-10-01T00:00:00+09:00')) / (365.25 * 24 * 60 * 60 * 1000));
      element.textContent = language === 'ja' ? `約${years}年間` : language === 'es' ? `aproximadamente ${years} años` : `approximately ${years} years`;
    });
    document.getElementById('site-language').value = language;
    document.querySelector('#site-language-picker label').textContent = {en:'Language',ja:'言語',es:'Idioma'}[language];
    translateLinks();
    if (observer) observer.observe(document.documentElement, {childList:true, subtree:true});
  }
  function setLanguage(value, updateURL = true) {
    language = languages.includes(value) ? value : defaultLanguage;
    if (updateURL) {
      const url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(history.state, '', url);
    }
    render();
  }
  window.siteI18n = {t:translate, setLanguage, get language() { return language; }};
  language = fromURL();
  function init() {
    const picker = document.createElement('nav');
    picker.id = 'site-language-picker';
    picker.setAttribute('translate', 'no');
    picker.innerHTML = '<label for="site-language">Language</label> <select id="site-language"><option value="en" lang="en">English</option><option value="ja" lang="ja">日本語</option><option value="es" lang="es">Español</option></select>';
    document.body.prepend(picker);
    document.getElementById('site-language').addEventListener('change', event => setLanguage(event.target.value));
    observer = new MutationObserver(render);
    render();
    window.addEventListener('popstate', () => setLanguage(fromURL(), false));
    window.addEventListener('pageshow', () => setLanguage(fromURL(), false));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();

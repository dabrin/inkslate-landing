// InkSlate landing — bilingual toggle
// Plain JS, runs everywhere. Persists to localStorage.

(function() {
  const KEY = 'inkslate_lang';
  const supported = ['en', 'es'];

  function getLang() {
    const stored = localStorage.getItem(KEY);
    if (stored && supported.includes(stored)) return stored;
    const nav = (navigator.language || 'en').slice(0, 2);
    return supported.includes(nav) ? nav : 'en';
  }

  function setLang(lang) {
    localStorage.setItem(KEY, lang);
    document.documentElement.dataset.lang = lang;
    document.querySelectorAll('[data-en]').forEach(el => {
      const text = el.dataset[lang];
      if (text != null) el.textContent = text;
    });
    document.querySelectorAll('[data-en-html]').forEach(el => {
      const html = el.dataset[lang + 'Html'];
      if (html != null) el.innerHTML = html;
    });
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // Wire on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    setLang(lang);
    document.querySelectorAll('.lang-toggle button').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const id = a.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  });
})();

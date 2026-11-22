/* ==========================================================================
   main.js — shared behaviour: Bootstrap tooltips/popovers, header state,
   image fade-in, scroll reveal, back-to-top, toasts, contact form (demo mode)
   ========================================================================== */
(function () {
  'use strict';

  const PX = (window.PX = window.PX || {});

  /* ---------- Bootstrap tooltips & popovers (re-callable for dynamic markup) ---------- */
  PX.initTips = function (root) {
    const scope = root || document;
    scope.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => bootstrap.Tooltip.getOrCreateInstance(el));
    scope.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => bootstrap.Popover.getOrCreateInstance(el));
  };
  PX.disposeTips = function (root) {
    root.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
      const t = bootstrap.Tooltip.getInstance(el);
      if (t) t.dispose();
    });
  };

  /* ---------- Images: fade in once decoded (placeholder colour shows meanwhile) ---------- */
  PX.watchImages = function (root) {
    (root || document).querySelectorAll('.frame img:not(.is-loaded)').forEach((img) => {
      const done = () => img.classList.add('is-loaded');
      if (img.complete && img.naturalWidth > 0) done();
      else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    });
  };

  /* ---------- Toasts ---------- */
  PX.toast = function (label, message) {
    const stack = document.getElementById('toasts');
    if (!stack) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.innerHTML = '<div class="toast-body d-flex gap-3 align-items-start"><span class="meta"></span><span class="flex-grow-1"></span>' +
      '<button type="button" class="btn-close btn-close-white ms-2" data-bs-dismiss="toast" aria-label="Закрыть"></button></div>';
    el.querySelector('.meta').textContent = label;
    el.querySelector('.flex-grow-1').textContent = message;
    stack.appendChild(el);
    el.addEventListener('hidden.bs.toast', () => el.remove());
    bootstrap.Toast.getOrCreateInstance(el, { delay: 4000 }).show();
  };

  /* ---------- Safe localStorage ---------- */
  PX.store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('photo:' + key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('photo:' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
    }
  };

  /* ---------- Header + back-to-top ---------- */
  const header = document.querySelector('.px-header');
  const toTop = document.querySelector('[data-to-top]');
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 10);
    if (toTop) toTop.classList.toggle('is-visible', y > 700);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Scroll reveal ---------- */
  PX.reveal = function (root) {
    const items = (root || document).querySelectorAll('.reveal:not(.is-in), .reveal-clip:not(.is-in)');
    if (!('IntersectionObserver' in window)) { items.forEach((el) => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });
    items.forEach((el) => io.observe(el));
  };

  /* ---------- Contact form: Bootstrap validation, demo mode (no backend) ---------- */
  const form = document.getElementById('contactForm');
  if (form) {
    const status = document.getElementById('formStatus');
    const subject = form.querySelector('[name="subject"]');
    const pre = new URLSearchParams(window.location.search).get('type');
    if (pre && subject && subject.querySelector('option[value="' + CSS.escape(pre) + '"]')) subject.value = pre;

    const message = form.querySelector('[name="message"]');
    const counter = form.querySelector('[data-char-count]');
    if (message && counter) {
      const upd = () => { counter.textContent = message.value.length + ' / ' + message.maxLength; };
      message.addEventListener('input', upd);
      upd();
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.classList.add('was-validated');
      if (!form.checkValidity()) {
        status.className = 'form-status mt-4';
        status.innerHTML = '<i class="bi bi-exclamation-triangle" aria-hidden="true"></i><span>Проверьте отмеченные поля.</span>';
        const bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        return;
      }
      const data = Object.fromEntries(new FormData(form));
      // Demo mode: nothing leaves the browser. The draft is kept locally so it is not lost.
      PX.store.set('contact-draft', { name: data.name, email: data.email, subject: data.subject, at: new Date().toISOString() });
      status.className = 'form-status is-demo mt-4';
      status.innerHTML = '<i class="bi bi-broadcast" aria-hidden="true"></i><div><span class="meta d-block mb-1">Demo mode · message not sent</span><span></span></div>';
      status.querySelector('div > span:last-child').textContent =
        'Спасибо, ' + data.name.trim() + '. Форма работает без сервера: проверка пройдена, но письмо не отправлено. Напишите на hello@annavorontsova.ru — или подключите обработчик формы.';
      PX.toast('Demo mode', 'Сообщение проверено, но не отправлено — сервер не подключён.');
      form.reset();
      form.classList.remove('was-validated');
      if (counter) counter.textContent = '0 / ' + message.maxLength;
    });
  }

  if (form) {
    form.addEventListener('reset', () => {
      form.classList.remove('was-validated');
      const status = document.getElementById('formStatus');
      status.className = 'd-none';
      const counter = form.querySelector('[data-char-count]');
      if (counter) setTimeout(() => { counter.textContent = '0 / ' + form.querySelector('[name="message"]').maxLength; }, 0);
    });
  }

  document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* ---------- Fit oversized display words to their column (font-independent safety net) ---------- */
  const fitEls = document.querySelectorAll('[data-fit]');
  const fit = () => {
    fitEls.forEach((el) => {
      el.style.fontSize = '';
      const avail = el.clientWidth;
      const need = el.scrollWidth;
      if (need > avail + 1) {
        const size = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = Math.floor(size * (avail / need) * 0.98) + 'px';
      }
    });
  };
  if (fitEls.length) {
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(fit, 120); });
  }

  PX.initTips();
  PX.watchImages();
  PX.reveal();
})();

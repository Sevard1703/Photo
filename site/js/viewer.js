/* ==========================================================================
   viewer.js — fullscreen photo viewer on top of a Bootstrap modal
   · opens from any [data-photo] element (sequence = its [data-sequence] container,
     its data-seq collection, or every frame on the page)
   · ← / → keys, Esc (Bootstrap), swipe, prev/next buttons, 01 / 24 counter
   · deep link: #frame-0004
   ========================================================================== */
(function () {
  'use strict';

  const DATA = window.PHOTO_ARCHIVE;
  const el = document.getElementById('viewer');
  if (!DATA || !el) return;

  const byId = Object.fromEntries(DATA.photos.map((p) => [p.id, p]));
  const cats = Object.fromEntries(DATA.categories.map((c) => [c.key, c.label]));
  const colls = Object.fromEntries(DATA.collections.map((c) => [c.key, c]));
  const modal = bootstrap.Modal.getOrCreateInstance(el);
  const img = el.querySelector('[data-v="img"]');
  const info = el.querySelector('[data-v-info]');
  const $ = (k) => el.querySelector('[data-v="' + k + '"]');

  let seq = [];
  let pos = 0;
  let token = 0;
  let returnFocus = null;

  const pad = (n) => String(n).padStart(2, '0');
  const src = (p, size) => 'images/archive/' + p.id + '-' + size + '.jpg';

  function sequenceFor(trigger) {
    if (trigger.dataset.seq && colls[trigger.dataset.seq]) return colls[trigger.dataset.seq].ids.slice();
    const root = trigger.closest('[data-sequence]') || document;
    const ids = [];
    root.querySelectorAll('[data-photo]').forEach((n) => {
      if (n.closest('.is-hidden') || n.closest('.d-none')) return;
      if (ids.indexOf(n.dataset.photo) === -1) ids.push(n.dataset.photo);
    });
    return ids;
  }

  function render(direction) {
    const p = byId[seq[pos]];
    const my = ++token;
    el.classList.add('is-loading');
    img.classList.add('is-out');
    img.classList.toggle('from-left', direction === -1);
    img.classList.toggle('from-right', direction === 1);

    const next = new Image();
    next.decoding = 'async';
    next.src = src(p, window.innerWidth > 1300 || window.devicePixelRatio > 1.5 ? 2000 : 1280);
    const show = () => {
      if (my !== token) return; // a newer frame was requested meanwhile
      img.src = next.src;
      img.alt = p.text;
      img.width = p.w;
      img.height = p.h;
      el.classList.remove('is-loading');
      requestAnimationFrame(() => img.classList.remove('is-out', 'from-left', 'from-right'));
    };
    next.decode ? next.decode().then(show, show) : (next.onload = show);

    $('pos').textContent = pad(pos + 1);
    $('total').textContent = pad(seq.length);
    $('id').textContent = p.id;
    $('category').textContent = cats[p.category];
    $('collection').textContent = 'Collection ' + colls[p.collection].n + ' — ' + colls[p.collection].title;
    $('title').textContent = p.title;
    $('text').textContent = p.text;
    $('format').textContent = p.ratio + ' · ' + p.w + '×' + p.h;
    $('tone').textContent = p.tone;

    const pop = bootstrap.Popover.getOrCreateInstance(info);
    pop.setContent({
      '.popover-header': 'Visual record ' + p.id,
      '.popover-body': 'Index ' + pad(p.index) + ' of ' + DATA.photos.length + ' · ' + cats[p.category] + ' · ' +
        (p.orient === 'v' ? 'vertical' : p.orient === 'sq' ? 'square' : p.orient === 'pano' ? 'panorama' : 'horizontal') +
        ' frame. Status: archived. Captured / unknown — generated placeholder.'
    });

    // preload neighbours
    [seq[(pos + 1) % seq.length], seq[(pos - 1 + seq.length) % seq.length]].forEach((id) => { new Image().src = src(byId[id], 1280); });
    history.replaceState(null, '', '#frame-' + p.id);
  }

  function go(step) {
    if (seq.length < 2) return;
    pos = (pos + step + seq.length) % seq.length;
    render(step);
  }

  function open(ids, startId, trigger) {
    seq = ids.filter((id) => byId[id]);
    if (!seq.length) return;
    pos = Math.max(0, seq.indexOf(startId));
    returnFocus = trigger || null;
    render(0);
    modal.show();
  }
  window.PXViewer = { open };

  document.addEventListener('click', (e) => {
    const play = e.target.closest('[data-play]');
    if (play && colls[play.dataset.play]) { open(colls[play.dataset.play].ids, null, play); return; }
    const t = e.target.closest('[data-photo]');
    if (!t || e.defaultPrevented) return;
    e.preventDefault();
    open(sequenceFor(t), t.dataset.photo, t);
  });

  el.querySelector('[data-v-prev]').addEventListener('click', () => go(-1));
  el.querySelector('[data-v-next]').addEventListener('click', () => go(1));

  document.addEventListener('keydown', (e) => {
    if (!el.classList.contains('show')) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  // Swipe (touch / pen); vertical scroll stays native
  const stage = el.querySelector('.viewer-stage');
  let x0 = null, y0 = null;
  stage.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { x0 = e.clientX; y0 = e.clientY; } });
  stage.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = y0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) go(dx < 0 ? 1 : -1);
  });
  stage.addEventListener('pointercancel', () => { x0 = y0 = null; });

  el.addEventListener('hidden.bs.modal', () => {
    const pop = bootstrap.Popover.getInstance(info);
    if (pop) pop.hide();
    history.replaceState(null, '', window.location.pathname + window.location.search);
    if (returnFocus && document.body.contains(returnFocus)) returnFocus.focus({ preventScroll: true });
  });

  // Deep link
  const m = window.location.hash.match(/^#frame-(\d{4})$/);
  if (m && byId[m[1]]) {
    const anyTile = document.querySelector('[data-photo="' + m[1] + '"]');
    open(anyTile ? sequenceFor(anyTile) : DATA.photos.map((p) => p.id), m[1], anyTile);
  }
})();

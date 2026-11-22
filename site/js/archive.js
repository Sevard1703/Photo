/* ==========================================================================
   archive.js — ARCHIVE page: category filter, search, sort, tone filter,
   grid / list view, counters, URL state (?category= ?collection= ?q=)
   ========================================================================== */
(function () {
  'use strict';

  const DATA = window.PHOTO_ARCHIVE;
  const PX = window.PX;
  const root = document.querySelector('[data-archive]');
  if (!DATA || !root) return;

  const grid = root.querySelector('[data-archive-grid]');
  const tbody = root.querySelector('[data-archive-rows]');
  const listWrap = root.querySelector('[data-archive-list]');
  const empty = root.querySelector('[data-archive-empty]');
  const search = document.querySelector('[data-archive-search]');
  const shownEl = document.querySelector('[data-shown]');
  const collChip = document.querySelector('[data-collection-chip]');
  const cats = Object.fromEntries(DATA.categories.map((c) => [c.key, c.label]));
  const colls = Object.fromEntries(DATA.collections.map((c) => [c.key, c]));
  const SORTS = {
    'index-asc': { label: 'Index ↑', fn: (a, b) => a.index - b.index },
    'index-desc': { label: 'Index ↓', fn: (a, b) => b.index - a.index },
    'title': { label: 'Title A–Z', fn: (a, b) => a.title.localeCompare(b.title) },
    'vertical': { label: 'Vertical first', fn: (a, b) => (a.w / a.h) - (b.w / b.h) },
    'wide': { label: 'Wide first', fn: (a, b) => (b.w / b.h) - (a.w / a.h) }
  };
  const TONES = { all: 'All tones', MONO: 'Mono', COLOR: 'Color' };

  const url = new URLSearchParams(window.location.search);
  const state = {
    category: cats[url.get('category')] ? url.get('category') : 'all',
    collection: colls[url.get('collection')] ? url.get('collection') : null,
    q: url.get('q') || '',
    sort: SORTS[PX.store.get('sort', 'index-asc')] ? PX.store.get('sort', 'index-asc') : 'index-asc',
    tone: 'all',
    view: PX.store.get('view', 'grid') === 'list' ? 'list' : 'grid'
  };

  const pad = (n) => String(n).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function frame(p, sizes, ar) {
    const srcset = Object.keys(p.widths).map((k) => 'images/archive/' + p.id + '-' + k + '.jpg ' + p.widths[k] + 'w').join(', ');
    return '<div class="frame" style="--ar: ' + (ar || p.w + ' / ' + p.h) + '; --ph: ' + p.ph + '">' +
      '<img src="images/archive/' + p.id + '-1280.jpg" srcset="' + srcset + '" sizes="' + sizes + '" width="' + p.w + '" height="' + p.h +
      '" alt="' + esc(p.text) + '" loading="lazy" decoding="async"></div>';
  }

  /* Art-directed rhythm: span depends on orientation and on the frame's place in the sequence */
  const RHYTHM = {
    pano: { lg: [12, 8], md: [6, 6], sm: 2 },
    h: { lg: [7, 6, 8, 5], md: [6, 4, 6], sm: 2 },
    v: { lg: [4, 3, 4, 3], md: [2, 3], sm: 1 },
    sq: { lg: [5, 4], md: [3, 3], sm: 1 }
  };
  function layout(list) {
    const seen = { pano: 0, h: 0, v: 0, sq: 0 };
    return list.map((p, i) => {
      const r = RHYTHM[p.orient];
      const k = seen[p.orient]++;
      const push = p.orient === 'v' && k % 2 === 1 ? 'push-1' : (i % 7 === 4 ? 'push-2' : '');
      return { p, lg: r.lg[k % r.lg.length], md: r.md[k % r.md.length], sm: r.sm, push, variant: p.orient === 'v' && k % 3 === 0 ? 'side' : (p.orient === 'sq' ? 'quiet' : '') };
    });
  }

  function tileHtml(t) {
    const p = t.p;
    const under = t.variant === 'side' ? '<span class="tile-under"><span class="meta">' + p.title + '</span><span class="meta">' + cats[p.category] + '</span></span>' : '';
    return '<div class="tile-wrap sp-' + t.lg + ' sp-md-' + t.md + ' sp-sm-' + t.sm + ' ' + t.push + (t.sm === 1 && t.push ? ' push-sm' : '') + '">' +
      '<button type="button" class="tile ' + (t.variant ? 'tile--' + t.variant : '') + '" data-photo="' + p.id + '" aria-label="Открыть кадр ' + p.id + ': ' + esc(p.title) + '">' +
      frame(p, '(min-width: 992px) ' + Math.round(t.lg / 12 * 100) + 'vw, (min-width: 576px) 50vw, 100vw') +
      '<span class="tile-id meta">№' + p.id + '</span>' +
      '<span class="tile-cap"><span class="t">' + p.title + '</span><span class="meta">' + cats[p.category] + ' · ' + p.ratio + ' · ' + p.tone + '</span></span>' +
      under + '</button></div>';
  }

  function rowHtml(p) {
    return '<tr data-photo="' + p.id + '" tabindex="0" aria-label="Открыть кадр ' + p.id + '">' +
      '<td class="thumb">' + frame(p, '72px', '1') + '</td>' +
      '<td class="font-monospace small">' + p.id + '</td>' +
      '<td><span class="ttl">' + p.title + '</span><span class="d-block small text-muted-px d-md-none">' + cats[p.category] + '</span></td>' +
      '<td class="d-none d-md-table-cell"><span class="badge-px">' + cats[p.category] + '</span></td>' +
      '<td class="d-none d-lg-table-cell meta">' + colls[p.collection].n + ' · ' + colls[p.collection].title + '</td>' +
      '<td class="d-none d-sm-table-cell font-monospace small">' + p.ratio + '</td>' +
      '<td class="d-none d-lg-table-cell"><span class="badge-px ' + (p.tone === 'MONO' ? '' : 'is-violet') + '">' + p.tone + '</span></td>' +
      '<td class="text-end"><i class="bi bi-arrows-angle-expand text-muted-px" aria-hidden="true"></i></td></tr>';
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return DATA.photos.filter((p) => {
      if (state.category !== 'all' && p.category !== state.category) return false;
      if (state.collection && p.collection !== state.collection) return false;
      if (state.tone !== 'all' && p.tone !== state.tone) return false;
      if (q) {
        const hay = (p.id + ' ' + p.title + ' ' + p.text + ' ' + p.tags + ' ' + cats[p.category] + ' ' + colls[p.collection].title).toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    }).sort(SORTS[state.sort].fn);
  }

  function syncUrl() {
    const u = new URLSearchParams();
    if (state.category !== 'all') u.set('category', state.category);
    if (state.collection) u.set('collection', state.collection);
    if (state.q.trim()) u.set('q', state.q.trim());
    history.replaceState(null, '', window.location.pathname + (u.toString() ? '?' + u : ''));
  }

  function render(animate) {
    const list = filtered();
    const paint = () => {
      PX.disposeTips(root);
      grid.innerHTML = layout(list).map(tileHtml).join('');
      tbody.innerHTML = list.map(rowHtml).join('');
      grid.classList.toggle('d-none', state.view !== 'grid' || !list.length);
      listWrap.classList.toggle('d-none', state.view !== 'list' || !list.length);
      empty.classList.toggle('d-none', list.length > 0);
      PX.watchImages(root);
      requestAnimationFrame(() => grid.classList.remove('is-updating'));
    };
    shownEl.textContent = pad(list.length) + ' / ' + pad(DATA.photos.length);
    // per-category counts respect the other active filters
    document.querySelectorAll('[data-cat-count]').forEach((c) => {
      const key = c.dataset.catCount;
      const saved = state.category;
      state.category = key;
      c.textContent = pad(filtered().length);
      state.category = saved;
    });
    document.querySelectorAll('[data-sort]').forEach((b) => b.classList.toggle('active', b.dataset.sort === state.sort));
    document.querySelector('[data-sort-label]').textContent = SORTS[state.sort].label;
    document.querySelectorAll('.dropdown-item[data-tone]').forEach((b) => b.classList.toggle('active', b.dataset.tone === state.tone));
    document.querySelector('[data-tone-label]').textContent = TONES[state.tone];
    if (collChip) {
      collChip.classList.toggle('d-none', !state.collection);
      if (state.collection) collChip.querySelector('[data-collection-name]').textContent = colls[state.collection].n + ' — ' + colls[state.collection].title;
    }
    syncUrl();
    if (animate) { grid.classList.add('is-updating'); setTimeout(paint, 200); } else paint();
  }

  /* ---------- Controls ---------- */
  document.querySelectorAll('input[name="category"]').forEach((r) => {
    r.checked = r.value === state.category;
    r.addEventListener('change', () => { state.category = r.value; render(true); });
  });
  if (search) {
    search.value = state.q;
    let t;
    search.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => { state.q = search.value; render(true); }, 180); });
    search.closest('form').addEventListener('submit', (e) => { e.preventDefault(); state.q = search.value; render(true); });
  }
  document.querySelectorAll('[data-sort]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault(); state.sort = b.dataset.sort; PX.store.set('sort', state.sort); render(true);
  }));
  document.querySelectorAll('[data-tone]').forEach((b) => b.addEventListener('click', (e) => {
    e.preventDefault(); state.tone = b.dataset.tone; render(true);
  }));
  document.querySelectorAll('input[name="view"]').forEach((r) => {
    r.checked = r.value === state.view;
    r.addEventListener('change', () => { state.view = r.value; PX.store.set('view', state.view); render(false); });
  });
  document.querySelectorAll('[data-archive-reset]').forEach((b) => b.addEventListener('click', () => {
    state.category = 'all'; state.collection = null; state.q = ''; state.tone = 'all';
    if (search) search.value = '';
    document.querySelectorAll('input[name="category"]').forEach((r) => { r.checked = r.value === 'all'; });
    render(true);
  }));
  if (collChip) collChip.querySelector('button').addEventListener('click', () => { state.collection = null; render(true); });

  // keyboard open for table rows
  tbody.addEventListener('keydown', (e) => {
    const tr = e.target.closest('tr[data-photo]');
    if (tr && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); tr.click(); }
  });

  render(false);
})();

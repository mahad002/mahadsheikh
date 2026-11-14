(() => {
  /* ---------- stack: real logos, grouped ---------- */
  const STACK = [
    ['Frontend', [['TypeScript', 'typescript-icon'], ['JavaScript', 'javascript'], ['React', 'react'], ['Next.js', 'nextjs-icon', 'ink'], ['Angular', 'angular-icon'], ['Tailwind CSS', 'tailwindcss-icon'], ['HTML5', 'html-5'], ['CSS', 'css']]],
    ['Backend', [['Node.js', 'nodejs-icon'], ['NestJS', 'nestjs'], ['Python', 'python'], ['Java', 'java'], ['Prisma', 'prisma', 'ink']]],
    ['Data', [['PostgreSQL', 'postgresql'], ['MongoDB', 'mongodb-icon'], ['Firebase', 'firebase'], ['Supabase', 'supabase-icon'], ['Airflow', 'airflow-icon']]],
    ['AI & machine learning', [['OpenAI', 'openai-icon', 'ink'], ['Gemini', 'google-gemini'], ['LangChain', 'langchain-icon', 'ink'], ['Hugging Face', 'hugging-face-icon'], ['PyTorch', 'pytorch-icon'], ['TensorFlow', 'tensorflow'], ['scikit-learn', 'scikitlearn'], ['MLflow', 'mlflow'], ['Pandas', 'pandas-icon'], ['Ollama', 'ollama', 'ink']]],
    ['Cloud & DevOps', [['AWS', 'aws'], ['Vercel', 'vercel-icon', 'ink'], ['Docker', 'docker-icon'], ['Kubernetes', 'kubernetes'], ['GitHub Actions', 'github-actions'], ['Jenkins', 'jenkins']]],
    ['Mobile & testing', [['Flutter', 'flutter-icon'], ['Dart', 'dart'], ['Cypress', 'cypress-icon'], ['Selenium', 'selenium'], ['Jest', 'jest'], ['JUnit', 'junit5']]],
    ['AI tools I work with daily', [['Claude', 'claude-icon'], ['Cursor', 'cursor-icon', 'ink'], ['ChatGPT', 'openai-icon', 'ink'], ['v0', 'v0', 'ink'], ['Windsurf', 'windsurf', 'ink']]],
    ['Built by my teams', [['Kotlin', 'kotlin-icon'], ['Kotlin Multiplatform', 'kotlin-icon'], ['Go', 'go'], ['Java Swing', 'java']], 'managed']
  ];
  const sg = document.getElementById('stackGrid');
  if (sg) sg.innerHTML = STACK.map(([t, items, kind]) => `
    <article class="stack-card ${kind || ''}">
      <h3>${t}</h3>
      <ul>${items.map(([n, ic]) => `<li><span class="ico"><img src="icons/${ic}.svg" alt="" loading="lazy"></span>${n}</li>`).join('')}</ul>
    </article>`).join('');

  /* ---------- countries ---------- */
  // Hidden from the site at the owner's request (kept in reviews.js). Remove a code from this list to show it again.
  const HIDDEN = ['il'];
  const R = (window.REVIEWS || []).filter(r => !HIDDEN.includes(r.cc));
  const counts = {};
  R.forEach(r => { counts[r.cc] = counts[r.cc] || { name: r.c, n: 0 }; counts[r.cc].n++; });
  const extra = { sg: { name: 'Singapore', note: 'GuruIsOnline' } };
  const list = Object.entries(counts).sort((a, b) => b[1].n - a[1].n).map(([cc, v]) => ({ cc, name: v.name.replace('Palestinian Territories', 'Palestine'), n: v.n }));
  Object.entries(extra).forEach(([cc, v]) => list.push({ cc, name: v.name, note: v.note }));
  const cl = document.getElementById('countries');
  if (cl) cl.innerHTML = list.map(c => `<li><img src="flags/${c.cc}.svg" alt="" width="24" height="18" loading="lazy" decoding="async"><span>${c.name}</span><em>${c.n ? c.n + (c.n === 1 ? ' review' : ' reviews') : c.note}</em></li>`).join('');
  window.COUNTRY_COUNTS = list;

  /* ---------- reviews wall ---------- */
  const wall = document.getElementById('revWall'), fl = document.getElementById('revFilters');
  if (!wall) return;
  const fmt = t => new Date(t + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  const stars = r => '★'.repeat(Math.round(r)) + '<i>' + '★'.repeat(5 - Math.round(r)) + '</i>';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let filter = 'all';
  const top = list.filter(c => c.n >= 4).slice(0, 7);
  fl.innerHTML = `<button aria-pressed="true" data-f="all">All countries</button>` +
    top.map(c => `<button aria-pressed="false" data-f="${c.cc}"><img src="flags/${c.cc}.svg" alt="" width="18" height="13">${c.name}<sup>${c.n}</sup></button>`).join('') +
    `<button aria-pressed="false" data-f="rest">${list.filter(c => c.n && c.n < 4).length} more countries<sup>${R.filter(r => counts[r.cc].n < 4).length}</sup></button>`;
  /* collage: cards on a tilted plane in rows; rows drift in alternating directions, drag or arrows slide them */
  const plane = wall, stage = document.getElementById('revStage');
  const card = r => {
    const len = r.q.length, size = len < 50 ? 's' : len < 150 ? 'm' : 'l';
    return `<figure class="rev rev-${size}">
      <div class="rev-top"><span class="av">${(r.i || '•').charAt(0).toUpperCase()}</span><div><b><img src="flags/${r.cc}.svg" alt="" width="18" height="13"><span>${r.c.replace('Palestinian Territories', 'Palestine')}</span></b><small><span class="rs" aria-label="${r.r} out of 5">${stars(r.r)}</span>${fmt(r.t)}</small></div></div>
      <blockquote>${r.q.replace(/</g, '&lt;')}</blockquote></figure>`;
  };
  const pb = document.getElementById('revPause');
  let rows = [], pos = [], half = [], speed = [], last = [], drag = 0, dragV = 0, paused = reduce, hover = false, visible = false, built = false, ticking = false;
  const render = () => {
    built = true;
    const list2 = R.filter(r => filter === 'all' || (filter === 'rest' ? counts[r.cc].n < 4 : r.cc === filter));
    const nRows = innerWidth < 640 ? 2 : 3;
    const buckets = Array.from({ length: nRows }, () => []);
    list2.forEach((r, i) => buckets[i % nRows].push(r));
    // short lists repeat so every row still fills the wall and loops seamlessly
    plane.innerHTML = buckets.map((b, k) => {
      let items = b.slice(); while (items.length && items.length < 8) items = items.concat(b);
      const html = items.map(card).join('');
      return `<div class="rev-row" data-k="${k}"><div class="rev-track">${html}${html.replace(/<figure class="rev/g, '<figure aria-hidden="true" class="rev')}</div></div>`;
    }).join('');
    rows = [...plane.querySelectorAll('.rev-track')];
    last = [];
    requestAnimationFrame(() => {
      half = rows.map(t => t.scrollWidth / 2);
      pos = rows.map((_, k) => -(half[k] * (0.15 + k * 0.2)));
      speed = rows.map((_, k) => (k % 2 ? -1 : 1) * (0.22 + k * 0.05));
    });
  };
  const wrap = (v, h) => h ? ((v % h) + h) % h - h : v;
  // the loop runs only while the wall is on screen, and writes a transform only when a row actually moved
  const tick = () => {
    if (!visible) { ticking = false; return; }
    if (rows.length && half.length) {
      const auto = paused || hover || drag !== 0 ? 0 : 1;
      rows.forEach((t, k) => {
        pos[k] += speed[k] * auto + dragV;
        const x = wrap(pos[k], half[k]).toFixed(2);
        if (x !== last[k]) { last[k] = x; t.style.transform = `translate3d(${x}px,0,0)`; }
      });
      dragV *= 0.9; if (Math.abs(dragV) < 0.05) dragV = 0;
    }
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; if (visible && !ticking) { ticking = true; requestAnimationFrame(tick); } })).observe(stage);
  // the 190-odd cards are built when the wall is about to scroll into view, not at page load
  const nearWall = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { nearWall.disconnect(); if (!built) render(); } }, { rootMargin: '900px' });
  nearWall.observe(stage);
  // drag (mouse and touch) slides every row together
  let lastX = null;
  let startX = 0, startCard = null;
  stage.addEventListener('pointerdown', e => { lastX = startX = e.clientX; startCard = e.target.closest('.rev'); drag = 1; try { stage.setPointerCapture(e.pointerId); } catch {} stage.classList.add('dragging'); });
  stage.addEventListener('pointermove', e => { if (lastX === null) return; const d = e.clientX - lastX; lastX = e.clientX; rows.forEach((_, k) => pos[k] += d * 1.4); dragV = d * 0.5; });
  const reader = document.getElementById('revReader');
  const up = e => {
    // a tap (no real drag) on a touch screen opens that card's full text below the wall
    if (e && e.type === 'pointerup' && e.pointerType !== 'mouse' && startCard && Math.abs(e.clientX - startX) < 8) {
      reader.innerHTML = startCard.outerHTML.replace(' aria-hidden="true"', '') + '<button class="rev-close" aria-label="Close">Close</button>';
      reader.hidden = false; paused = true; pb.setAttribute('aria-pressed', true); pb.querySelector('span').textContent = 'Play';
    }
    lastX = null; drag = 0; startCard = null; stage.classList.remove('dragging');
  };
  reader.addEventListener('click', e => { if (e.target.closest('.rev-close')) { reader.hidden = true; } });
  stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
  stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
  // hover (mouse): highlight the card in place and show its full text flat beside it; nothing moves under the pointer
  const peek = document.getElementById('revPeek');
  let hot = null;
  const place = c => {
    const b = c.getBoundingClientRect(), w = peek.offsetWidth, h = peek.offsetHeight, m = 16;
    let x = b.right + 14, ox = 'left';
    if (x + w > innerWidth - m) { x = b.left - w - 14; ox = 'right'; }
    if (x < m) x = Math.min(Math.max(m, b.left + b.width / 2 - w / 2), innerWidth - w - m);
    const y = Math.min(Math.max(m + 64, b.top + b.height / 2 - h / 2), innerHeight - h - m);
    peek.style.setProperty('--px', x + 'px'); peek.style.setProperty('--py', y + 'px'); peek.style.setProperty('--ox', ox);
  };
  const clearHot = () => { hot?.classList.remove('is-hot'); hot = null; peek.classList.remove('on'); };
  stage.addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse' || drag) { if (drag) clearHot(); return; }
    const c = e.target.closest('.rev');
    if (c === hot) return;
    clearHot();
    if (!c) return;
    hot = c; c.classList.add('is-hot');
    const bq = c.querySelector('blockquote');
    if (bq && bq.scrollHeight > bq.clientHeight + 2) {          // only when the card's text is cut off
      peek.innerHTML = c.outerHTML.replace(' aria-hidden="true"', '').replace(' is-hot', '');
      place(c); peek.classList.add('on');
    }
  });
  stage.addEventListener('pointerleave', () => { hover = false; clearHot(); });
  addEventListener('scroll', clearHot, { passive: true });
  const nudge = dir => { let n = 0; const go = () => { rows.forEach((_, k) => pos[k] += dir * 18); if (++n < 24) requestAnimationFrame(go); }; go(); };
  document.getElementById('deckPrev').addEventListener('click', () => nudge(1));
  document.getElementById('deckNext').addEventListener('click', () => nudge(-1));
  stage.tabIndex = 0;
  stage.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') { nudge(1); e.preventDefault(); } if (e.key === 'ArrowRight') { nudge(-1); e.preventDefault(); } });
  if (reduce) { pb.setAttribute('aria-pressed', true); pb.querySelector('span').textContent = 'Play'; }
  pb.addEventListener('click', () => { paused = !paused; pb.setAttribute('aria-pressed', paused); pb.querySelector('span').textContent = paused ? 'Play' : 'Pause'; });
  let lastW = innerWidth; addEventListener('resize', () => { if (built && (innerWidth < 640) !== (lastW < 640)) render(); lastW = innerWidth; });
  fl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.f; fl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); render();
  });


  /* freelance record: open the saved screenshots in a dialog */
  const dlg = document.getElementById('recordDialog');
  if (dlg) ['recordOpen', 'recordOpen2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => dlg.showModal()));
  dlg?.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
})();

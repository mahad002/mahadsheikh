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
  if (cl) cl.innerHTML = list.map(c => `<li><img src="flags/${c.cc}.svg" alt="" width="24" height="18"><span>${c.name}</span><em>${c.n ? c.n + (c.n === 1 ? ' review' : ' reviews') : c.note}</em></li>`).join('');
  window.COUNTRY_COUNTS = list;

  /* ---------- reviews wall ---------- */
  const wall = document.getElementById('revWall'), fl = document.getElementById('revFilters');
  if (!wall) return;
  const fmt = t => new Date(t + 'T00:00:00').toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
  const stars = r => '★'.repeat(Math.round(r)) + '<i>' + '★'.repeat(5 - Math.round(r)) + '</i>';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let filter = 'all', deck = null;
  const top = list.filter(c => c.n >= 4).slice(0, 7);
  fl.innerHTML = `<button aria-pressed="true" data-f="all">All countries</button>` +
    top.map(c => `<button aria-pressed="false" data-f="${c.cc}"><img src="flags/${c.cc}.svg" alt="" width="18" height="13">${c.name}<sup>${c.n}</sup></button>`).join('') +
    `<button aria-pressed="false" data-f="rest">${list.filter(c => c.n && c.n < 4).length} more countries<sup>${R.filter(r => counts[r.cc].n < 4).length}</sup></button>`;
  const count = document.getElementById('deckCount');
  const render = () => {
    const rows = R.filter(r => filter === 'all' || (filter === 'rest' ? counts[r.cc].n < 4 : r.cc === filter));
    wall.innerHTML = rows.map((r, k) => `
      <div class="swiper-slide" style="--k:${k % 5}">
        <figure class="rev">
          <div class="rev-top"><span class="av">${(r.i || '•').charAt(0).toUpperCase()}</span><div><b><img src="flags/${r.cc}.svg" alt="" width="18" height="13"><span>${r.c.replace('Palestinian Territories', 'Palestine')}</span></b><small><span class="rs" aria-label="${r.r} out of 5">${stars(r.r)}</span>${fmt(r.t)}</small></div></div>
          <blockquote>${r.q.replace(/</g, '&lt;')}</blockquote>
        </figure>
      </div>`).join('');
    if (deck) deck.destroy(true, true);
    const n = rows.length;
    const upd = s => { count.textContent = `${String(s.realIndex + 1).padStart(2, '0')} / ${n}`; };
    deck = new Swiper('#revDeck', {
      effect: 'coverflow', grabCursor: true, centeredSlides: true, slidesPerView: 'auto',
      loop: n > 8, slideToClickedSlide: true, speed: reduce ? 0 : 650,
      keyboard: { enabled: true, onlyInViewport: true },
      navigation: { nextEl: '#deckNext', prevEl: '#deckPrev' },
      coverflowEffect: { rotate: 26, stretch: 0, depth: 170, modifier: 1, slideShadows: false },
      on: { slideChange: upd }
    });
    deck.slideToLoop(0, 0, false); upd(deck);
  };
  fl.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    filter = b.dataset.f; fl.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); render();
  });
  render();
})();

(() => {
  const P = window.PROJECTS || [];
  const byId = Object.fromEntries(P.map(p => [p.id, p]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const arrow = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12L12 4M5 4h7v7"/></svg>';
  let lastClicked = null;

  /* nav */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });
  const mb = nav.querySelector('.menu-btn');
  mb.addEventListener('click', () => {
    const open = mb.getAttribute('aria-expanded') !== 'true';
    mb.setAttribute('aria-expanded', open); mb.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open); document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('ul a, .btn').forEach(a => a.addEventListener('click', () => { if (nav.classList.contains('open')) mb.click(); }));

  /* hero: real client screens drifting on a tilted plane behind the portrait */
  const plane = document.getElementById('plane');
  const hero = document.querySelector('.hero');
  if (plane) {
    const shots = ['gwm', 'somara', 'isra', 'bunai', 'emotiverse', 'exec', 'guru', 'inspirovix'];
    const lanes = Array.from({ length: 5 }, (_, l) => Array.from({ length: 4 }, (_, k) => shots[(l * 3 + k) % shots.length]));
    plane.innerHTML = lanes.map(l => {
      const items = l.map(id => `<a href="${id === 'inspirovix' ? 'https://www.inspirovix.com/' : 'work.html?p=' + id}" tabindex="-1" aria-hidden="true"><img src="img/${id}.webp" alt="" width="1440" height="900" decoding="async"></a>`).join('');
      return `<div class="lane">${items}${items}</div>`;
    }).join('');
    const pause = document.getElementById('pause');
    pause.addEventListener('click', () => {
      const p = hero.classList.toggle('paused');
      pause.setAttribute('aria-pressed', p); pause.querySelector('span').textContent = p ? 'Play' : 'Pause';
      document.getElementById('musicBox')?.classList.toggle('paused', p);
    });
  }

  /* split the big name into letters for the entrance */
  document.querySelectorAll('.h-name').forEach(n => { n.innerHTML = [...n.textContent].map((c, i) => `<span style="--i:${i}">${c}</span>`).join(''); });

  /* depth: layers follow the pointer at different rates */
  if (hero && !reduce && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let tx = 0, ty = 0, cx = 0, cy = 0, run = false;
    const tick = () => {
      cx += (tx - cx) * .07; cy += (ty - cy) * .07;
      hero.style.setProperty('--mx', cx.toFixed(4)); hero.style.setProperty('--my', cy.toFixed(4));
      if (Math.abs(tx - cx) > .001 || Math.abs(ty - cy) > .001) requestAnimationFrame(tick); else run = false;
    };
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width * 2 - 1; ty = (e.clientY - r.top) / r.height * 2 - 1;
      if (!run) { run = true; requestAnimationFrame(tick); }
    });
    hero.addEventListener('pointerleave', () => { tx = 0; ty = 0; if (!run) { run = true; requestAnimationFrame(tick); } });
  }

  /* GreenRock: 0 -> 9, played once when it comes into view */
  const team = document.getElementById('team');
  if (team) {
    team.innerHTML = Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}"></i>`).join('');
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { team.classList.add('on'); o.disconnect(); } }), { threshold: .6 }).observe(team);
  }

  /* pulse length for the AI flow */
  const flow = document.getElementById('flow');
  const setLen = () => flow && flow.style.setProperty('--len', (flow.offsetHeight - 70) + 'px');
  setLen(); addEventListener('resize', setLen);

  /* waveform */
  const wave = document.getElementById('wave');
  if (wave) {
    const n = innerWidth < 640 ? 36 : 56;
    wave.innerHTML = Array.from({ length: n }, (_, i) => {
      const h = 18 + Math.abs(Math.sin(i * .42) * 52 + Math.sin(i * 1.7) * 22) ;
      return `<i style="--h:${Math.min(100, h).toFixed(0)};--i:${i}"></i>`;
    }).join('');
  }

  /* the wall */
  const wall = document.getElementById('wall');
  if (wall) {
    // rows of the wall; each card's width follows its image's own proportions, so a row shares one height and nothing is cropped
    const ROWS = [
      [['gwm', 'img/gwm.webp', 1440, 900], ['somara', 'img/somara.webp', 1440, 900]],
      [['guru', 'img/guru-set.webp', 1600, 900], ['bunai', 'img/bunai-set.webp', 1600, 900]],
      [['emotiverse', 'img/emotiverse.webp', 1440, 900], ['exec', 'img/exec-set.webp', 1600, 900], ['isra', 'img/isra.webp', 1440, 900]],
      [['majorwerks', 'img/majorwerks-set.webp', 1600, 900], ['wecarhire', 'img/wecarhire-set.webp', 1600, 900]],
      [['phone2door', 'img/phone2door-set.webp', 1600, 900], ['housing', 'img/housing-set.webp', 1600, 900], ['weather', 'img/weather.webp', 1400, 815]]
    ];
    wall.innerHTML = ROWS.map(row => `<div class="row">${row.map(([id, src, w, h]) => { const p = byId[id]; return `
      <a class="tile" style="--r:${(w / h).toFixed(4)}" href="work.html?p=${p.id}" data-id="${p.id}" data-tag="${p.tag}">
        <div class="img"><img src="${src}" alt="${p.title}: ${p.kind.toLowerCase()}" width="${w}" height="${h}" loading="lazy" decoding="async"></div>
        <div class="meta"><div><b>${p.title}</b><span>${p.kind} · ${p.where}</span></div><em class="${p.live ? 'live' : ''}">${p.live ? 'Live' : 'Offline'}</em></div>
      </a>`; }).join('')}</div>`).join('');

    const btns = document.querySelectorAll('.filters button');
    btns.forEach(b => {
      const f = b.dataset.f;
      b.insertAdjacentHTML('beforeend', `<sup>${f === 'all' ? P.length : P.filter(p => p.tag === f).length}</sup>`);
      b.addEventListener('click', () => {
        const go = () => {
          btns.forEach(x => x.setAttribute('aria-pressed', x === b));
          wall.classList.toggle('filtered', f !== 'all');
          wall.querySelectorAll('.tile').forEach(t => t.classList.toggle('hide', f !== 'all' && t.dataset.tag !== f));
        };
        if (document.startViewTransition && !reduce) {
          wall.querySelectorAll('.tile').forEach((t, i) => t.style.viewTransitionName = 't' + i);
          document.startViewTransition(go).finished.finally(() => wall.querySelectorAll('.tile').forEach(t => t.style.viewTransitionName = ''));
        } else go();
      });
    });

    /* cursor label that follows the pointer over the wall */
    const cur = document.getElementById('cursor');
    if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
      let x = 0, y = 0, raf = 0;
      wall.addEventListener('pointermove', e => {
        x = e.clientX; y = e.clientY;
        if (!raf) raf = requestAnimationFrame(() => { cur.style.setProperty('--x', x + 'px'); cur.style.setProperty('--y', y + 'px'); raf = 0; });
      });
      wall.querySelectorAll('.tile').forEach(t => {
        t.addEventListener('pointerenter', () => { cur.querySelector('span').textContent = 'Open ' + byId[t.dataset.id].title; cur.classList.add('on'); });
        t.addEventListener('pointerleave', () => cur.classList.remove('on'));
      });
    } else cur.remove();
  }

  /* shared-element morph: the clicked screen becomes the case-study hero */
  document.addEventListener('click', e => { const a = e.target.closest('a[data-id]'); if (a) lastClicked = a.querySelector('img'); }, true);
  addEventListener('pageswap', e => {
    if (!e.viewTransition || !lastClicked) return;
    lastClicked.style.viewTransitionName = 'hero-shot';
    e.viewTransition.finished.finally(() => { if (lastClicked) lastClicked.style.viewTransitionName = ''; });
  });
  addEventListener('pagereveal', e => {
    if (!e.viewTransition || !window.navigation?.activation?.from) return;
    const id = new URL(navigation.activation.from.url).searchParams.get('p');
    const img = id && wall?.querySelector(`.tile[data-id="${id}"] img`);
    if (!img) return;
    img.style.viewTransitionName = 'hero-shot';
    e.viewTransition.finished.finally(() => img.style.viewTransitionName = '');
  });
})();

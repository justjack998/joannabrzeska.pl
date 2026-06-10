// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => {
  if (window.scrollY > 24) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Burger (mobile menu)
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
if (burger && links) {
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
}

// ---- YouTube lite-embed (click-to-play, privacy no-cookie) ----
document.querySelectorAll('.video-card').forEach((card) => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-yt');
    if (!id || id === 'REPLACE_ID') {
      // brak realnego ID — nie ładuj pustego playera
      card.classList.add('video-card--todo');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    iframe.title = card.querySelector('.video-card__title')?.textContent || 'Film';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    iframe.className = 'video-card__iframe';
    card.innerHTML = '';
    card.appendChild(iframe);
    card.classList.add('is-playing');
  });
});

// ---- Pricing tabs ----
document.querySelectorAll('.pricetabs').forEach((wrap) => {
  const tabs = wrap.querySelectorAll('.pricetab');
  const panels = wrap.querySelectorAll('.pricepanel');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.getAttribute('data-tab');
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', String(on));
      });
      panels.forEach((p) => {
        const on = p.getAttribute('data-panel') === key;
        p.classList.toggle('is-active', on);
        p.hidden = !on;
      });
    });
  });
});

// ---- Mobile menu toggle ----
(() => {
  const burgerBtn = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__links');
  if (!burgerBtn || !menu) return;
  const close = () => { menu.classList.remove('is-open'); document.body.classList.remove('menu-open'); burgerBtn.setAttribute('aria-expanded', 'false'); };
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
})();

// ---- Pointer-reactive flourishes (desktop, motion-safe) ----
(() => {
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;

  // soft cursor glow in heroes
  document.querySelectorAll('.hero, .page-hero').forEach((sec) => {
    let raf = 0, x = 0, y = 0;
    sec.addEventListener('pointermove', (e) => {
      const r = sec.getBoundingClientRect();
      x = e.clientX - r.left; y = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(() => {
        sec.style.setProperty('--cx', x + 'px');
        sec.style.setProperty('--cy', y + 'px');
        raf = 0;
      });
    });
  });

  // magnetic large CTAs
  document.querySelectorAll('.btn--lg').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      btn.style.transform = `translate(${dx * 5}px, ${dy * 4}px)`;
    });
    btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
  });

  // gateway door subtle tilt
  document.querySelectorAll('.door').forEach((door) => {
    door.addEventListener('pointermove', (e) => {
      const r = door.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -4;
      const ry = ((e.clientX - r.left) / r.width - 0.5) * 4;
      door.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    });
    door.addEventListener('pointerleave', () => { door.style.transform = ''; });
  });
})();

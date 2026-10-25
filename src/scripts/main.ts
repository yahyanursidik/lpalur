// Interaksi & animasi halaman NataAlur. Tanpa dependensi; semua menghormati prefers-reduced-motion.

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/* ---------- Siap tampil (hero) ---------- */
requestAnimationFrame(() => {
  document.documentElement.classList.add('is-ready');
  $('.hero')?.classList.add('is-in');
});

$$('[data-year]').forEach((el) => (el.textContent = String(new Date().getFullYear())));

/* ---------- Reveal saat scroll ---------- */
const revealIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        revealIO.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
);
$$('[data-reveal]').forEach((el) => revealIO.observe(el));

/* ---------- Header, progres scroll, tombol ke atas ---------- */
const header = $('[data-header]');
const progress = $('.scroll-progress');
const toTop = $('[data-to-top]');

toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));

/* ---------- Scroll spy ---------- */
const spyLinks = $$('[data-spy]');
// Bagian "alur" berada di bawah menu Solusi.
const spyMap: Record<string, string> = { solusi: 'solusi', fitur: 'fitur', alur: 'solusi', industri: 'industri', implementasi: 'implementasi' };
const spyTargets = Object.keys(spyMap)
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => !!el);
const spyIO = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      spyLinks.forEach((l) => l.classList.toggle('is-active', l.dataset.spy === spyMap[e.target.id]));
    }
  },
  { rootMargin: '-45% 0px -50% 0px' },
);
spyTargets.forEach((t) => spyIO.observe(t));
// Bagian di luar target spy (hero, FAQ, kontak) mengosongkan penanda aktif.
['produk', 'faq', 'kontak'].forEach((id) => {
  const el = document.getElementById(id);
  if (!el) return;
  new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) spyLinks.forEach((l) => l.classList.remove('is-active'));
    },
    { rootMargin: '-45% 0px -50% 0px' },
  ).observe(el);
});

/* ---------- Dropdown (mega menu) ---------- */
const ddItems = $$('[data-dd]');
let ddTimer = 0;

function closeAllDd(except?: HTMLElement) {
  ddItems.forEach((item) => {
    if (item === except) return;
    item.classList.remove('is-open');
    $('[data-dd-trigger]', item)?.setAttribute('aria-expanded', 'false');
  });
}

function openDd(item: HTMLElement) {
  closeAllDd(item);
  item.classList.add('is-open');
  $('[data-dd-trigger]', item)?.setAttribute('aria-expanded', 'true');
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

ddItems.forEach((item) => {
  const trigger = $<HTMLButtonElement>('[data-dd-trigger]', item)!;
  trigger.addEventListener('click', () => {
    if (item.classList.contains('is-open')) closeAllDd();
    else openDd(item);
  });
  if (finePointer) {
    item.addEventListener('pointerenter', () => {
      clearTimeout(ddTimer);
      ddTimer = window.setTimeout(() => openDd(item), 60);
    });
    item.addEventListener('pointerleave', () => {
      clearTimeout(ddTimer);
      ddTimer = window.setTimeout(() => closeAllDd(), 160);
    });
  }
  item.addEventListener('focusout', (e) => {
    if (!item.contains(e.relatedTarget as Node)) {
      item.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
  $$('a', item).forEach((a) => a.addEventListener('click', () => closeAllDd()));
});

document.addEventListener('click', (e) => {
  if (!(e.target as Element).closest('[data-dd]')) closeAllDd();
});

/* ---------- Menu mobile ---------- */
const burger = $<HTMLButtonElement>('[data-burger]');
const mnav = $('[data-mnav]');

function setMobile(open: boolean) {
  if (!burger || !mnav) return;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
  header?.classList.toggle('is-open', open);
  document.body.classList.toggle('is-locked', open);
  if (open) {
    mnav.hidden = false;
    requestAnimationFrame(() => mnav.classList.add('is-open'));
  } else {
    mnav.classList.remove('is-open');
    window.setTimeout(() => {
      if (burger.getAttribute('aria-expanded') === 'false') mnav.hidden = true;
    }, reduce ? 0 : 300);
  }
}

burger?.addEventListener('click', () => setMobile(burger.getAttribute('aria-expanded') !== 'true'));
$$('[data-mnav-link]').forEach((a) => a.addEventListener('click', () => setMobile(false)));
window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => e.matches && setMobile(false));

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = ddItems.find((i) => i.classList.contains('is-open'));
  if (open) {
    closeAllDd();
    $<HTMLButtonElement>('[data-dd-trigger]', open)?.focus();
  }
  if (burger?.getAttribute('aria-expanded') === 'true') {
    setMobile(false);
    burger.focus();
  }
});

/* ---------- Tabs dengan auto-advance (dipakai preview & industri) ---------- */
interface TabsOpts {
  root: HTMLElement;
  tabs: HTMLButtonElement[];
  panels: HTMLElement[];
  progressSel: string;
  playVar: string;
  vertical?: boolean;
  stopOnClick?: boolean;
  autoClass?: string;
  onChange?: (i: number) => void;
}

function initTabs(o: TabsOpts) {
  let current = Math.max(0, o.tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
  let auto = !reduce;
  let inView = false;
  let hovering = false;

  const syncPlay = () => {
    o.root.style.setProperty(o.playVar, auto && inView && !hovering ? 'running' : 'paused');
  };

  const select = (i: number, focus = false) => {
    current = (i + o.tabs.length) % o.tabs.length;
    o.tabs.forEach((t, k) => {
      const on = k === current;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      // Restart animasi progres
      const bar = $(o.progressSel, t);
      if (bar && on) {
        bar.style.animation = 'none';
        void bar.offsetWidth;
        bar.style.animation = '';
      }
    });
    o.panels.forEach((p, k) => {
      const on = k === current;
      p.classList.toggle('is-active', on);
      p.classList.remove('is-play');
      p.hidden = !on;
      if (on) requestAnimationFrame(() => requestAnimationFrame(() => p.classList.add('is-play')));
    });
    if (focus) o.tabs[current].focus();
    o.onChange?.(current);
  };

  o.tabs.forEach((t, i) => {
    t.addEventListener('click', () => {
      if (o.stopOnClick) {
        auto = false;
        if (o.autoClass) o.root.classList.remove(o.autoClass);
        syncPlay();
      }
      select(i);
    });
    t.addEventListener('keydown', (e) => {
      const next = o.vertical ? ['ArrowDown', 'ArrowRight'] : ['ArrowRight', 'ArrowDown'];
      const prev = o.vertical ? ['ArrowUp', 'ArrowLeft'] : ['ArrowLeft', 'ArrowUp'];
      if (next.includes(e.key)) { e.preventDefault(); select(current + 1, true); }
      else if (prev.includes(e.key)) { e.preventDefault(); select(current - 1, true); }
      else if (e.key === 'Home') { e.preventDefault(); select(0, true); }
      else if (e.key === 'End') { e.preventDefault(); select(o.tabs.length - 1, true); }
    });
    const bar = $(o.progressSel, t);
    bar?.addEventListener('animationend', () => {
      if (auto && t.getAttribute('aria-selected') === 'true') select(current + 1);
    });
  });

  o.root.addEventListener('pointerenter', () => { hovering = true; syncPlay(); });
  o.root.addEventListener('pointerleave', () => { hovering = false; syncPlay(); });
  o.root.addEventListener('focusin', () => { hovering = true; syncPlay(); });
  o.root.addEventListener('focusout', (e) => {
    if (!o.root.contains(e.relatedTarget as Node)) { hovering = false; syncPlay(); }
  });

  new IntersectionObserver(
    (entries) => {
      inView = entries[0].isIntersecting;
      syncPlay();
      if (inView) o.panels[current].classList.add('is-play');
    },
    { threshold: 0.35 },
  ).observe(o.root);

  if (o.autoClass && auto) o.root.classList.add(o.autoClass);
  syncPlay();
  return { select, get current() { return current; } };
}

/* ---------- Preview produk ---------- */
const pv = $('.pv');
if (pv) {
  const tabs = $$<HTMLButtonElement>('.pv__tab', pv);
  const panels = $$('.pv__panel', pv);
  const caption = $('[data-pv-caption] .label-illustration', pv);
  if (reduce) pv.classList.add('is-static');

  initTabs({
    root: pv,
    tabs,
    panels,
    progressSel: '.pv__prog',
    playVar: '--pv-play',
    onChange: (i) => {
      if (caption) caption.textContent = tabs[i].dataset.caption ?? '';
    },
  });

  // Skala mockup mengikuti lebar layar
  const screen = $('[data-pv-screen]', pv);
  const mockScale = $('.mock-scale', pv);
  if (screen) {
    const setScale = () => screen.style.setProperty('--s', String(screen.clientWidth / (mockScale?.offsetWidth || 1280)));
    new ResizeObserver(setScale).observe(screen);
    setScale();
  }
}

/* ---------- Modul: keterhubungan ---------- */
const modGrid = $('[data-modules]');
const modHint = $('[data-mod-hint]');
const modHintText = $('[data-mod-hint-text]');
const defaultHint = modHintText?.textContent ?? '';

function focusModule(card: HTMLElement | null) {
  if (!modGrid) return;
  const cards = $$('.mcard', modGrid);
  if (!card) {
    modGrid.classList.remove('is-linking');
    cards.forEach((c) => c.classList.remove('is-focus', 'is-linked'));
    modHint?.classList.remove('is-on');
    if (modHintText) modHintText.textContent = defaultHint;
    return;
  }
  const links = (card.dataset.links ?? '').split(',');
  modGrid.classList.add('is-linking');
  cards.forEach((c) => {
    c.classList.toggle('is-focus', c === card);
    c.classList.toggle('is-linked', links.includes(c.dataset.mod ?? ''));
  });
  modHint?.classList.add('is-on');
  if (modHintText) modHintText.textContent = `${card.dataset.name} terhubung dengan ${card.dataset.linknames}.`;
}

if (modGrid) {
  $$('.mcard', modGrid).forEach((card) => {
    card.addEventListener('pointerenter', (e) => {
      if ((e as PointerEvent).pointerType === 'mouse') focusModule(card);
    });
    card.addEventListener('focus', () => focusModule(card));
    card.addEventListener('click', () => {
      focusModule(card.classList.contains('is-focus') && !finePointer ? null : card);
    });
  });
  modGrid.addEventListener('pointerleave', (e) => {
    if ((e as PointerEvent).pointerType === 'mouse') focusModule(null);
  });
  modGrid.addEventListener('focusout', (e) => {
    if (!modGrid.contains(e.relatedTarget as Node)) focusModule(null);
  });
}

$$('[data-goto-module]').forEach((a) =>
  a.addEventListener('click', () => {
    const card = document.getElementById(`modul-${a.dataset.gotoModule}`);
    if (!card) return;
    window.setTimeout(() => {
      card.classList.remove('is-ping');
      void card.offsetWidth;
      card.classList.add('is-ping');
      focusModule(card);
      window.setTimeout(() => focusModule(null), 2600);
    }, reduce ? 0 : 650);
  }),
);

/* ---------- Industri ---------- */
const ind = $('[data-ind]');
if (ind) {
  const section = ind.closest<HTMLElement>('.ind')!;
  const tabs = $$<HTMLButtonElement>('.itab', ind);
  initTabs({
    root: section,
    tabs,
    panels: $$('.ipanel', ind),
    progressSel: '.itab__prog',
    playVar: '--ind-play',
    vertical: true,
    stopOnClick: true,
    autoClass: 'is-auto',
  });
  $$('[data-goto-industry]').forEach((a) =>
    a.addEventListener('click', () => {
      const i = tabs.findIndex((t) => t.dataset.indId === a.dataset.gotoIndustry);
      if (i >= 0) tabs[i].click();
    }),
  );
}

/* ---------- Alur (scroll-linked) ---------- */
const flow = $('[data-flow]');
const flowPath = $<SVGPathElement>('[data-flow-path]');
const flowDot = $('[data-flow-dot]');
const flowSteps = $$('[data-flow-step]');
const flowStatus = $('[data-flow-status]');
const flowPips = $$('[data-flow-pip]');
const flowLen = flowPath?.getTotalLength() ?? 0;
let flowActive = -1;

function updateFlow(vh: number) {
  if (!flow) return;
  const r = flow.getBoundingClientRect();
  const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (vh * 0.5));
  flow.style.setProperty('--fp', p.toFixed(4));

  if (flowPath && flowDot && flowDot.offsetParent) {
    const pt = flowPath.getPointAtLength(flowLen * p);
    const svg = flowPath.ownerSVGElement!;
    const w = svg.clientWidth || r.width;
    flowDot.style.setProperty('--dx', `${(pt.x / 1000) * w}px`);
    flowDot.style.setProperty('--dy', `${(pt.y / 140) * 140}px`);
    flowDot.style.setProperty('--do', p > 0.01 && p < 0.995 ? '1' : '0');
  }

  const n = flowSteps.length - 1;
  let active = -1;
  flowSteps.forEach((s, i) => {
    const on = p >= i / n - 0.02;
    s.classList.toggle('is-on', on);
    if (on) active = i;
  });
  flowPips.forEach((pip, i) => pip.classList.toggle('is-on', i <= active));
  if (active !== flowActive && flowStatus) {
    flowActive = active;
    const step = flowSteps[Math.max(0, active)];
    flowStatus.textContent = step?.dataset.status ?? '';
    // Restart animasi teks status
    flowStatus.style.animation = 'none';
    void flowStatus.offsetWidth;
    flowStatus.style.animation = '';
  }
}

/* ---------- Tilt preview & parallax ---------- */
const tiltWin = $('.pv__window');
const parallax = $$('[data-parallax]');

function updateTilt(vh: number) {
  if (!tiltWin || reduce) return;
  const r = tiltWin.getBoundingClientRect();
  const t = clamp((r.top - vh * 0.12) / (vh * 0.55));
  tiltWin.style.setProperty('--tilt', t.toFixed(4));
  parallax.forEach((el) => {
    const f = parseFloat(el.dataset.parallax ?? '0');
    const center = r.top + r.height / 2 - vh / 2;
    el.style.setProperty('--py', `${(center * f).toFixed(1)}px`);
  });
}

/* ---------- Loop scroll terpadu ---------- */
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    header?.classList.toggle('is-scrolled', y > 8);
    toTop?.classList.toggle('is-visible', y > vh * 1.2);
    const max = document.documentElement.scrollHeight - vh;
    progress?.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : '0');
    updateTilt(vh);
    updateFlow(vh);
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();

/* ---------- FAQ akordion halus ---------- */
const qas = $$<HTMLDetailsElement>('.qa');

function animateQa(d: HTMLDetailsElement, open: boolean) {
  const body = $('.qa__body', d);
  if (!body || reduce) {
    d.open = open;
    return;
  }
  if (open) {
    d.open = true;
    const h = body.scrollHeight;
    body.animate([{ height: '0px', opacity: 0 }, { height: `${h}px`, opacity: 1 }], {
      duration: 380,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
  } else {
    const h = body.scrollHeight;
    const anim = body.animate([{ height: `${h}px`, opacity: 1 }, { height: '0px', opacity: 0 }], {
      duration: 300,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    });
    anim.onfinish = () => (d.open = false);
  }
}

qas.forEach((d) => {
  $('summary', d)?.addEventListener('click', (e) => {
    e.preventDefault();
    const willOpen = !d.open;
    if (willOpen) qas.forEach((o) => o !== d && o.open && animateQa(o, false));
    animateQa(d, willOpen);
  });
});

/* ---------- Formulir lead ---------- */
const form = $<HTMLFormElement>('[data-lead]');
const done = $('[data-lead-done]');
const COOLDOWN_KEY = 'na-lead-at';
const COOLDOWN_MS = 60_000;

function fieldError(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  const v = el.value.trim();
  if (el.type === 'checkbox') return (el as HTMLInputElement).checked ? '' : 'Mohon centang persetujuan ini.';
  if (el.required && !v) return 'Wajib diisi.';
  if (el.name === 'kontak' && v) {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const phone = /^(\+62|62|0)[\d\s-]{8,15}$/.test(v.replace(/[()]/g, ''));
    if (!email && !phone) return 'Masukkan email atau nomor WhatsApp yang valid.';
  }
  if (el instanceof HTMLTextAreaElement && v.length < el.minLength) return `Ceritakan sedikit lebih detail (min. ${el.minLength} karakter).`;
  return '';
}

function showError(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, msg: string) {
  if (el.type === 'checkbox') {
    const err = $('.field__err--check', form!);
    if (err) err.textContent = msg;
    el.setAttribute('aria-invalid', String(!!msg));
    return;
  }
  const field = el.closest('.field');
  field?.classList.toggle('is-invalid', !!msg);
  const err = $('.field__err', field!);
  if (err) err.textContent = msg;
  el.setAttribute('aria-invalid', String(!!msg));
  if (err && !err.id) err.id = `${el.id}-err`;
  if (err) el.setAttribute('aria-describedby', err.id);
}

if (form && done) {
  const controls = $$<HTMLInputElement>('input:not([name="_gotcha"]), select, textarea', form);
  controls.forEach((el) => {
    el.addEventListener('blur', () => el.value && showError(el, fieldError(el)));
    el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && showError(el, fieldError(el)));
    el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && showError(el, fieldError(el)));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let first: HTMLElement | null = null;
    controls.forEach((el) => {
      const msg = fieldError(el);
      showError(el, msg);
      if (msg && !first) first = el;
    });
    if (first) {
      (first as HTMLElement).focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    // Honeypot terisi → anggap bot, tampilkan sukses tanpa mengirim.
    if (data._gotcha) {
      finish('Pesan Anda sudah kami terima.');
      return;
    }

    let last = 0;
    try { last = Number(localStorage.getItem(COOLDOWN_KEY) || 0); } catch { /* storage tidak tersedia */ }
    if (Date.now() - last < COOLDOWN_MS) {
      const err = $('.field__err--check', form);
      if (err) err.textContent = 'Anda baru saja mengirim pesan. Coba lagi dalam satu menit.';
      return;
    }

    delete data._gotcha;
    const endpoint = form.dataset.endpoint;
    const email = form.dataset.email ?? '';
    form.classList.add('is-sending');
    const submit = $<HTMLButtonElement>('.lead__submit', form);
    if (submit) submit.disabled = true;

    try {
      if (endpoint) {
        // Formspree: `_subject` jadi judul email, `email` dipakai sebagai reply-to.
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.kontak);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            ...data,
            persetujuan: 'Ya',
            ...(isEmail ? { email: data.kontak } : {}),
            _subject: `Inquiry NataAlur — ${data.perusahaan} (${data.jenis_usaha})`,
            sumber: 'nataalur.my.id',
          }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => null);
          const detail = json?.errors?.map((x: { message: string }) => x.message).join(' ');
          throw new Error(detail || String(res.status));
        }
        finish('Pesan Anda sudah kami terima. Tim akan menghubungi melalui kontak yang Anda berikan.');
      } else {
        const subject = `Diskusi kebutuhan ERP — ${data.perusahaan}`;
        const body = [
          `Nama: ${data.nama}`,
          `Perusahaan: ${data.perusahaan}`,
          `Kontak: ${data.kontak}`,
          `Jenis usaha: ${data.jenis_usaha}`,
          '',
          'Gambaran kebutuhan:',
          data.kebutuhan,
        ].join('\n');
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        finish(`Aplikasi email Anda akan terbuka dengan pesan yang sudah terisi. Jika tidak terbuka, kirim langsung ke ${email}.`);
      }
      try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch { /* abaikan */ }
    } catch (error) {
      console.error('Formulir gagal dikirim:', error);
      const err = $('.field__err--check', form);
      if (err) err.textContent = `Pesan belum terkirim. Coba lagi, atau email langsung ke ${email}.`;
    } finally {
      form.classList.remove('is-sending');
      if (submit) submit.disabled = false;
    }
  });

  function finish(text: string) {
    const t = $('[data-lead-done-text]', done!);
    if (t) t.textContent = text;
    form!.hidden = true;
    done!.hidden = false;
    done!.focus();
  }

  $('[data-lead-reset]', done)?.addEventListener('click', () => {
    form.reset();
    done.hidden = true;
    form.hidden = false;
    $<HTMLInputElement>('input', form)?.focus();
  });
}

export {};

const nav = document.getElementById('main-nav');
const menu = document.getElementById('nav-menu');
const navHeight = nav.offsetHeight;

// Nav shadow on scroll — only toggle on state change, passive to avoid blocking scroll
let hasNavShadow = false;
window.addEventListener('scroll', () => {
    const shouldShadow = window.scrollY > 0;
    if (shouldShadow !== hasNavShadow) {
        nav.classList.toggle('shadow-md', shouldShadow);
        hasNavShadow = shouldShadow;
    }
}, { passive: true });

// Mobile menu toggle
document.getElementById('nav-toggle').addEventListener('click', () => {
    menu.classList.toggle('nav-open');
    document.getElementById('nav-icon-open').classList.toggle('hidden');
    document.getElementById('nav-icon-close').classList.toggle('hidden');
});

// Close mobile menu
function closeMenu() {
    if (!menu.classList.contains('nav-open')) return false;
    menu.classList.remove('nav-open');
    document.getElementById('nav-icon-open').classList.remove('hidden');
    document.getElementById('nav-icon-close').classList.add('hidden');
    return true;
}

// Animated scroll (500ms ease-in-out)
function smoothScroll(target) {
    const targetY = target.getBoundingClientRect().top + window.scrollY - navHeight;
    const startY = window.scrollY;
    const diff = targetY - startY;
    let start;

    function step(ts) {
        if (!start) start = ts;
        const t = Math.min((ts - start) / 500, 1);
        const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        window.scrollTo(0, startY + diff * ease);
        if (t < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

// Anchor link clicks — close menu first, then scroll
document.querySelectorAll('.nav-scroll').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();

        if (closeMenu()) {
            menu.addEventListener('transitionend', () => smoothScroll(target), { once: true });
        } else {
            smoothScroll(target);
        }
    });
});

// Scroll spy — IntersectionObserver (no per-scroll geometry reads)
const navLinks = document.querySelectorAll('#nav-menu .nav-scroll');
const sections = [...navLinks].map(link => {
    const id = link.getAttribute('href').substring(1);
    return { id, el: document.getElementById(id), link };
}).filter(s => s.el);

function setActive(id) {
    navLinks.forEach(link => {
        link.classList.toggle('nav-link-active', link.getAttribute('href') === '#' + id);
    });
}

const visible = new Set();
const spy = new IntersectionObserver(entries => {
    for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target.id);
        else visible.delete(e.target.id);
    }
    const firstVisible = sections.find(s => visible.has(s.id));
    if (firstVisible) setActive(firstVisible.id);
}, {
    rootMargin: `-${navHeight + 20}px 0px -60% 0px`,
    threshold: 0,
});
sections.forEach(s => spy.observe(s.el));

// Dark mode
const darkToggle = document.getElementById('dark-mode-toggle');
const darkEls = ['dark-icon-sun', 'dark-label-light'];
const lightEls = ['dark-icon-moon', 'dark-label-dark'];

function applyDarkMode(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    darkEls.forEach(id => document.getElementById(id).classList.toggle('hidden', !isDark));
    lightEls.forEach(id => document.getElementById(id).classList.toggle('hidden', isDark));
}

const stored = localStorage.getItem('darkMode');
applyDarkMode(stored !== null ? stored === 'true' : matchMedia('(prefers-color-scheme: dark)').matches);

darkToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    applyDarkMode(isDark);
});

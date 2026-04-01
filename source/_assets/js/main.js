const nav = document.getElementById('main-nav');
const menu = document.getElementById('nav-menu');
const navHeight = nav.offsetHeight;

// Nav shadow on scroll
window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow-md', window.scrollY > 0);
});

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

// Scroll spy — highlight active nav link
const navLinks = document.querySelectorAll('#nav-menu .nav-scroll');
const sections = [...navLinks].map(link => {
    const id = link.getAttribute('href').substring(1);
    return { id, el: document.getElementById(id) };
}).filter(s => s.el);

function updateActiveNav() {
    const threshold = navHeight + 20;
    let current = '';

    for (const s of sections) {
        if (s.el.getBoundingClientRect().top <= threshold) current = s.id;
    }

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = sections[sections.length - 1].id;
    }

    navLinks.forEach(link => {
        link.classList.toggle('nav-link-active', link.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

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

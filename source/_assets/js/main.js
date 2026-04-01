// Sticky nav shadow on scroll
const nav = document.getElementById('main-nav');
window.addEventListener('scroll', function () {
    nav.classList.toggle('shadow-md', window.scrollY > 0);
});

// Responsive navbar toggle
document.getElementById('nav-toggle').addEventListener('click', function () {
    const menu = document.getElementById('nav-menu');
    const iconOpen = document.getElementById('nav-icon-open');
    const iconClose = document.getElementById('nav-icon-close');
    menu.classList.toggle('nav-open');
    iconOpen.classList.toggle('hidden');
    iconClose.classList.toggle('hidden');
});

// Smooth scroll for anchor links
document.querySelectorAll('.nav-scroll').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            var offset = nav.offsetHeight;
            var top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });

            // Close mobile menu if open
            var menu = document.getElementById('nav-menu');
            if (menu.classList.contains('nav-open')) {
                menu.classList.remove('nav-open');
                document.getElementById('nav-icon-open').classList.remove('hidden');
                document.getElementById('nav-icon-close').classList.add('hidden');
            }
        }
    });
});

// Scroll spy — highlight active nav link based on scroll position
var navLinks = document.querySelectorAll('#nav-menu .nav-scroll');
var sections = [];
navLinks.forEach(function (link) {
    var id = link.getAttribute('href').substring(1);
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section });
});

function updateActiveNav() {
    var offset = nav.offsetHeight + 20;
    var current = '';

    sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top <= offset) {
            current = s.id;
        }
    });

    // If scrolled to bottom, activate last section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
        current = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
        var isActive = link.getAttribute('href') === '#' + current;
        link.classList.toggle('nav-link-active', isActive);
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
const iconSun = document.getElementById('dark-icon-sun');
const iconMoon = document.getElementById('dark-icon-moon');
const labelLight = document.getElementById('dark-label-light');
const labelDark = document.getElementById('dark-label-dark');

function applyDarkMode(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
    labelLight.classList.toggle('hidden', !isDark);
    labelDark.classList.toggle('hidden', isDark);
}

// Initialize from localStorage or system preference
const stored = localStorage.getItem('darkMode');
if (stored !== null) {
    applyDarkMode(stored === 'true');
} else {
    applyDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
}

darkToggle.addEventListener('click', function () {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    iconSun.classList.toggle('hidden', !isDark);
    iconMoon.classList.toggle('hidden', isDark);
    labelLight.classList.toggle('hidden', !isDark);
    labelDark.classList.toggle('hidden', isDark);
});

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


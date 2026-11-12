// Reveal sections as they scroll into view (once)
const reveals = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach((el) => revealObserver.observe(el));
} else {
    reveals.forEach((el) => el.classList.add('active'));
}

// Navbar: border on scroll + highlight the current section
const nav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav .nav-link[href^="#"]');
const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 10);

    const offset = window.scrollY + window.innerHeight * 0.35;
    let current = null;
    sections.forEach((section) => {
        if (section.offsetTop <= offset) current = section.id;
    });
    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Close the mobile menu after choosing a link
const menu = document.getElementById('mainNav');
document.querySelectorAll('#mainNav a').forEach((link) => {
    link.addEventListener('click', () => {
        if (menu.classList.contains('show') && window.bootstrap) {
            bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
    });
});

// Keep the footer year current
document.getElementById('year').textContent = new Date().getFullYear();

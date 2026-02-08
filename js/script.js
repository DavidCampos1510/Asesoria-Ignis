// ========== PRELOADER ==========
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
            preloader.style.pointerEvents = 'none';
        }, 600);
    }
});

// ========== VARIABLES GLOBALES ==========
let hamburger, navMenu, navLinks, header;
let contenido, calendly, footer;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function () {
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-menu a');
    header = document.getElementById('header');

    contenido = document.getElementById('contenidoPrincipal');
    calendly = document.getElementById('calendlySection');
    footer = document.querySelector('footer');

    initMobileMenu();
    initHeaderEffects();
    initBackToTop();
    initWhatsAppButtons();
    initMobileForms();
    initContactForm();
    initCalendly();
    initNavigation();
    initFAQ();
    initAnimations();
});

// ========== MENÚ MÓVIL (CORREGIDO) ==========
function initMobileMenu() {
    if (!hamburger || !navMenu) return;

    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');

        navMenu.style.pointerEvents = 'auto';
        navMenu.style.zIndex = '9999';

        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
    }

    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        navMenu.style.pointerEvents = '';
        navMenu.style.zIndex = '';

        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }

    hamburger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        navMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });

    // Cerrar al tocar un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Cerrar tocando fuera
    document.addEventListener('click', function (e) {
        if (
            navMenu.classList.contains('active') &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });
}

// ========== NAVEGACIÓN ==========
function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || this.id === 'btnAbrirCalendly') return;

            const target = document.getElementById(href.substring(1));
            if (!target) return;

            e.preventDefault();

            if (calendly) calendly.style.display = 'none';
            if (contenido) contenido.style.display = 'block';
            if (footer) footer.style.display = 'block';

            const offset = header ? header.offsetHeight : 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({ top, behavior: 'smooth' });
            history.pushState(null, null, href);
        });
    });
}

// ========== CALENDLY ==========
function initCalendly() {
    const btn = document.getElementById('btnAbrirCalendly');
    if (!btn || !calendly) return;

    btn.addEventListener('click', function (e) {
        e.preventDefault();

        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');

        if (contenido) contenido.style.display = 'none';
        calendly.style.display = 'block';
        if (footer) footer.style.display = 'none';

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
            if (typeof Calendly !== 'undefined') {
                Calendly.initInlineWidget({
                    url: 'https://calendly.com/fernanda-herrera-asesorialegalignis/60min',
                    parentElement: document.querySelector('.calendly-inline-widget')
                });
            }
        }, 100);
    });
}

// ========== HEADER ==========
function initHeaderEffects() {
    if (!header) return;

    function updateHeader() {
        if (window.innerWidth > 920 && window.scrollY > 100) {
            header.classList.add('header-scrolled', 'sticky');
        } else {
            header.classList.remove('header-scrolled', 'sticky');
        }
    }

    window.addEventListener('scroll', updateHeader);
    window.addEventListener('resize', updateHeader);
    updateHeader();
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('active', window.scrollY > 300);
    });

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========== WHATSAPP ==========
function initWhatsAppButtons() {
    document.querySelectorAll('.whatsapp-float, a[href*="whatsapp"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        });
    });
}

// ========== FORMULARIOS MÓVILES ==========
function initMobileForms() {
    if (!/Android|iPhone|iPad/i.test(navigator.userAgent)) return;
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('focus', () => select.style.fontSize = '16px');
        select.addEventListener('blur', () => select.style.fontSize = '');
    });
}

// ========== FAQ ==========
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function () {
            const a = this.nextElementSibling;
            const open = this.classList.contains('active');

            document.querySelectorAll('.faq-question').forEach(x => {
                x.classList.remove('active');
                x.nextElementSibling.style.display = 'none';
            });

            if (!open) {
                this.classList.add('active');
                a.style.display = 'block';
            }
        });
    });
}

// ========== ANIMACIONES ==========
function initAnimations() {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    }, { threshold: 0.2 });

    items.forEach(i => observer.observe(i));
}

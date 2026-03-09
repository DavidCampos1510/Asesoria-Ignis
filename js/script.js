// ========== PRELOADER ==========
window.addEventListener('load', function() {
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
let hamburger, navMenu, menuOverlay, closeMenuBtn, header;
let contenido, calendly, footer;

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Inicializando script con menú hamburguesa mejorado...');
    
    // Inicializar variables del menú mejorado
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    menuOverlay = document.querySelector('.menu-overlay');
    closeMenuBtn = document.querySelector('.close-menu');
    header = document.getElementById('header');
    
    contenido = document.getElementById('contenidoPrincipal');
    calendly = document.getElementById('calendlySection');
    footer = document.querySelector('footer');
    
    console.log('✅ Elementos encontrados:');
    console.log('- Hamburger:', !!hamburger);
    console.log('- NavMenu:', !!navMenu);
    console.log('- MenuOverlay:', !!menuOverlay);
    console.log('- CloseMenuBtn:', !!closeMenuBtn);
    console.log('- Calendly:', !!calendly);
    console.log('- Contenido:', !!contenido);
    console.log('- Footer:', !!footer);
    
    // Inicializar módulos
    initMobileMenu();           // Menú hamburguesa mejorado
    initHeaderEffects();
    initBackToTop();
    initWhatsAppButtons();
    initMobileForms();
    initContactForm();
    initCalendly();            // Calendly mejorado
    initNavigation();
    initFAQ();
    initAnimations();
    
    // Forzar carga inicial en móvil
    if (window.innerWidth <= 920) {
        initMobileSpecificFeatures();
    }
    
    console.log('🚀 Script inicializado correctamente');
    
    // 🔥 FIX ESPECÍFICO PARA BOTÓN CALENDLY EN DESKTOP
    setTimeout(() => {
        fixCalendlyButtons();
        debugCalendlyButtons();
    }, 500);
});

// ========== FIX ESPECÍFICO PARA BOTÓN CALENDLY ==========
function fixCalendlyButtons() {
    console.log('🔧 Aplicando fix específico para botones Calendly...');
    
    // Buscar TODOS los botones con ID 'btnAbrirCalendly'
    const calendlyButtons = document.querySelectorAll('#btnAbrirCalendly');
    
    if (calendlyButtons.length === 0) {
        console.log('❌ No se encontraron botones Calendly para fix');
        return;
    }
    
    console.log(`✅ Encontrados ${calendlyButtons.length} botones Calendly para fix`);
    
    calendlyButtons.forEach((btn, index) => {
        // Clonar el botón para limpiar eventos previos
        const clonedBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(clonedBtn, btn);
        
        // Agregar href="#" si no lo tiene
        if (!clonedBtn.getAttribute('href')) {
            clonedBtn.setAttribute('href', '#');
            console.log(`✅ Agregado href="#" al botón ${index + 1}`);
        }
        
        // Agregar evento de clic MANUALMENTE
        clonedBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🎯 Botón Calendly ${index + 1} clickeado (FIX aplicado)`);
            console.log('📍 Ubicación:', this.closest('.nav-menu') ? 'Menú' : 'Header');
            
            // Cerrar menú móvil si está abierto
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
                console.log('📱 Menú móvil cerrado');
            }
            
            // Mostrar Calendly, ocultar contenido
            if (contenido) contenido.style.display = 'none';
            if (calendly) calendly.style.display = 'block';
            if (footer) footer.style.display = 'none';
            
            // Scroll al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Forzar carga de Calendly
            setTimeout(() => {
                if (typeof Calendly !== 'undefined' && Calendly.initInlineWidget) {
                    const widget = document.querySelector('.calendly-inline-widget');
                    if (widget) {
                        Calendly.initInlineWidget({
                            url: 'https://calendly.com/fernanda-herrera-asesorialegalignis/60min',
                            parentElement: widget
                        });
                    }
                }
            }, 300);
            
            return false;
        });
        
        console.log(`✅ Fix aplicado al botón ${index + 1}`);
    });
}

// ========== CALENDLY MEJORADO ==========
function initCalendly() {
    console.log('🎯 Inicializando Calendly...');
    
    // Buscar TODOS los botones con ID 'btnAbrirCalendly'
    const calendlyButtons = document.querySelectorAll('#btnAbrirCalendly');
    
    if (calendlyButtons.length === 0) {
        console.log('❌ No se encontraron botones de Calendly');
        return;
    }
    
    console.log(`✅ Encontrados ${calendlyButtons.length} botones de Calendly en initCalendly`);
    
    // Agregar eventos a los botones (esto es un respaldo)
    calendlyButtons.forEach((btn, index) => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`🎯 Botón Calendly ${index + 1} clickeado (desde initCalendly)`);
            
            // Cerrar menú móvil si está abierto
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
            
            // Mostrar Calendly, ocultar contenido
            if (contenido) contenido.style.display = 'none';
            if (calendly) calendly.style.display = 'block';
            if (footer) footer.style.display = 'none';
            
            // Scroll al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            return false;
        });
    });
    
    // Botón volver de Calendly
    const btnCerrarCalendly2 = document.getElementById('btnCerrarCalendly2');
    if (btnCerrarCalendly2) {
        btnCerrarCalendly2.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (calendly) calendly.style.display = 'none';
            if (contenido) contenido.style.display = 'block';
            if (footer) footer.style.display = 'block';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Detectar cuando se agenda en Calendly
    window.addEventListener('message', function(e) {
        if (e.data.event === 'calendly.event_scheduled') {
            if (calendly) calendly.style.display = 'none';
            if (contenido) contenido.style.display = 'block';
            if (footer) footer.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

// ========== DEBUG CALENDLY BUTTONS ==========
function debugCalendlyButtons() {
    console.log('🔍 DEBUG - Botones Calendly:');
    
    const calendlyButtons = document.querySelectorAll('#btnAbrirCalendly');
    console.log(`- Total botones encontrados: ${calendlyButtons.length}`);
    
    calendlyButtons.forEach((btn, i) => {
        console.log(`  Botón ${i + 1}:`, {
            texto: btn.textContent.trim(),
            href: btn.getAttribute('href'),
            tieneHref: btn.hasAttribute('href'),
            ubicación: btn.closest('.nav-menu') ? 'Menú' : 'Otra ubicación',
            padre: btn.parentNode.tagName
        });
    });
    
    // Verificar si hay conflictos con otros eventos
    const navMenuLinks = document.querySelectorAll('.nav-menu a');
    console.log(`- Total enlaces en menú: ${navMenuLinks.length}`);
}

// ========== MENÚ HAMBURGUESA MEJORADO ==========
function initMobileMenu() {
    if (!hamburger || !navMenu) {
        console.log('❌ Elementos del menú no encontrados');
        return;
    }
    
    // Función para abrir menú con animación
    function openMobileMenu() {
        hamburger.classList.add('active');
        navMenu.classList.add('active');
        if (menuOverlay) {
            menuOverlay.classList.add('active');
        }
        
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
        
        // Animación de entrada para cada ítem del menú
        const menuItems = navMenu.querySelectorAll('li');
        menuItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            item.style.animationName = 'slideInRight';
            item.style.animationDuration = '0.4s';
            item.style.animationFillMode = 'forwards';
        });
        
        console.log('📱 Menú móvil ABIERTO con animaciones');
    }
    
    // Función para cerrar menú con animación
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        
        // Añadir clase de cierre para animación
        navMenu.classList.add('closing');
        if (menuOverlay) {
            menuOverlay.classList.remove('active');
        }
        
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
        
        // Remover clases después de la animación
        setTimeout(() => {
            navMenu.classList.remove('active');
            navMenu.classList.remove('closing');
            
            // Resetear animaciones
            const menuItems = navMenu.querySelectorAll('li');
            menuItems.forEach(item => {
                item.style.animationName = '';
                item.style.animationDelay = '';
            });
        }, 400);
        
        console.log('📱 Menú móvil CERRADO con animación');
    }
    
    // Toggle hamburguesa
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Botón de cerrar (X)
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMobileMenu();
        });
    }
    
    // Overlay para cerrar
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }
    
    // Cerrar al hacer clic en enlaces (excepto Calendly)
    const allMenuLinks = navMenu.querySelectorAll('a');
    allMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Si NO es el botón de Calendly, cerrar menú
            if (this.id !== 'btnAbrirCalendly') {
                closeMobileMenu();
                
                // Si es enlace interno, hacer scroll después de cerrar
                const href = this.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#') {
                    e.preventDefault();
                    
                    setTimeout(() => {
                        const target = document.querySelector(href);
                        if (target) {
                            const headerHeight = header ? header.offsetHeight : 80;
                            const targetPosition = target.offsetTop - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }
                    }, 500); // Esperar a que el menú se cierre
                }
            }
        });
    });
    
    // Cerrar con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Prevenir scroll cuando el menú está abierto
    navMenu.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
    
    console.log('✅ Menú móvil MEJORADO inicializado');
}

// ========== NAVEGACIÓN MEJORADA ==========
function initNavigation() {
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Saltar enlaces vacíos o a la misma página
            if (href === '#' || href === '') return;
            
            // Evitar conflicto con btnAbrirCalendly
            if (this.id === 'btnAbrirCalendly') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                if (hamburger && navMenu && navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    if (menuOverlay) menuOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                    document.body.classList.remove('menu-open');
                }
                
                // Asegurar que Calendly esté cerrado
                if (calendly) calendly.style.display = 'none';
                if (contenido) contenido.style.display = 'block';
                if (footer) footer.style.display = 'block';
                
                // Calcular scroll con offset para header
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Scroll suave
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL
                history.pushState(null, null, href);
            }
        });
    });
}

// ========== HEADER EFFECTS ==========
function initHeaderEffects() {
    if (!header) return;
    
    function updateHeader() {
        if (window.innerWidth > 920) {
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled', 'sticky');
            } else {
                header.classList.remove('header-scrolled', 'sticky');
            }
        } else {
            // En móvil, asegurar que no tenga efectos de scroll
            header.classList.remove('header-scrolled', 'sticky');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Ejecutar al cargar
    
    // Responsive - resetear en móvil
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 920) {
            header.classList.remove('header-scrolled', 'sticky');
        }
        updateHeader();
    });
}

// ========== BACK TO TOP ==========
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active', 'show');
        } else {
            backToTop.classList.remove('active', 'show');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========== WHATSAPP ==========
function initWhatsAppButtons() {
    document.querySelectorAll('.whatsapp-float, a[href*="whatsapp"]').forEach(btn => {
        btn.addEventListener('click', function() {
            // Cerrar menú móvil si está abierto
            if (hamburger && navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        });
    });
}

// ========== FORMULARIOS MÓVILES ==========
function initMobileForms() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return;
    
    document.querySelectorAll('select').forEach(select => {
        select.addEventListener('focus', function() {
            this.style.fontSize = '16px';
        });
        
        select.addEventListener('blur', function() {
            this.style.fontSize = '';
        });
    });
}

// ========== FORMULARIO DE CONTACTO ==========
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Elementos del formulario
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const privacyInput = document.getElementById('privacy');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const successMessage = document.getElementById('successMessageBottom');
    
    // Ocultar mensaje de éxito al inicio
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    
    // Funciones de validación
    function showError(input, errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (input) input.classList.add('error');
    }
    
    function hideError(input, errorElement) {
        if (errorElement) errorElement.style.display = 'none';
        if (input) input.classList.remove('error');
    }
    
    // Validaciones
    function validateName() {
        if (!nameInput || nameInput.value.trim() === '') {
            showError(nameInput, document.getElementById('nameError'), 'El nombre es obligatorio');
            return false;
        }
        hideError(nameInput, document.getElementById('nameError'));
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || emailInput.value.trim() === '') {
            showError(emailInput, document.getElementById('emailError'), 'El email es obligatorio');
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, document.getElementById('emailError'), 'Por favor, introduce un email válido');
            return false;
        }
        hideError(emailInput, document.getElementById('emailError'));
        return true;
    }
    
    function validatePhone() {
        const phoneRegex = /^[0-9+\-\s()]{8,}$/;
        if (!phoneInput || phoneInput.value.trim() === '') {
            showError(phoneInput, document.getElementById('phoneError'), 'El teléfono es obligatorio');
            return false;
        } else if (!phoneRegex.test(phoneInput.value)) {
            showError(phoneInput, document.getElementById('phoneError'), 'Por favor, introduce un teléfono válido');
            return false;
        }
        hideError(phoneInput, document.getElementById('phoneError'));
        return true;
    }
    
    function validatePrivacy() {
        if (!privacyInput || !privacyInput.checked) {
            showError(privacyInput, document.getElementById('privacyError'), 'Debes aceptar la política de privacidad');
            return false;
        }
        hideError(privacyInput, document.getElementById('privacyError'));
        return true;
    }
    
    // Eventos en tiempo real
    if (nameInput) {
        nameInput.addEventListener('input', () => hideError(nameInput, document.getElementById('nameError')));
    }
    if (emailInput) {
        emailInput.addEventListener('input', () => hideError(emailInput, document.getElementById('emailError')));
    }
    if (phoneInput) {
        phoneInput.addEventListener('input', () => hideError(phoneInput, document.getElementById('phoneError')));
    }
    if (privacyInput) {
        privacyInput.addEventListener('change', validatePrivacy);
    }
    
    // Envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPrivacyValid = validatePrivacy();
        
        if (!(isNameValid && isEmailValid && isPhoneValid && isPrivacyValid)) {
            if (!isNameValid) nameInput.focus();
            else if (!isEmailValid) emailInput.focus();
            else if (!isPhoneValid) phoneInput.focus();
            else if (!isPrivacyValid) privacyInput.focus();
            return;
        }
        
        // Mostrar estado de carga
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        if (submitText) submitText.textContent = 'Enviando...';
        
        // Crear formulario temporal
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = contactForm.action;
        tempForm.style.display = 'none';
        
        // Copiar valores
        Array.from(contactForm.elements).forEach(el => {
            if (el.name && el.type !== 'submit' && el.type !== 'checkbox') {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = el.name;
                hiddenInput.value = el.value;
                tempForm.appendChild(hiddenInput);
            }
        });
        
        if (privacyInput && privacyInput.checked) {
            const privacyHidden = document.createElement('input');
            privacyHidden.type = 'hidden';
            privacyHidden.name = 'privacy';
            privacyHidden.value = 'Aceptado';
            tempForm.appendChild(privacyHidden);
        }
        
        // Campos de configuración
        const configFields = {
            _subject: '🚨 NUEVA CONSULTA LEGAL - Asesoria Legal Ignis',
            _template: 'table',
            _captcha: 'false',
            _autoresponse: '✅ Hemos recibido tu consulta legal. Te contactaremos dentro de 24 horas hábiles. - Asesoria Legal Ignis'
        };
        
        for (const key in configFields) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = configFields[key];
            tempForm.appendChild(input);
        }
        
        document.body.appendChild(tempForm);
        
        // Mostrar mensaje de éxito
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.opacity = '1';
        }
        
        // Limpiar formulario
        contactForm.reset();
        
        // Enviar formulario
        setTimeout(() => tempForm.submit(), 150);
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            if (successMessage) {
                successMessage.style.opacity = '0';
                setTimeout(() => { successMessage.style.display = 'none'; }, 500);
            }
        }, 5000);
        
        // Restaurar botón
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            if (submitText) submitText.textContent = 'Enviar Mensaje';
        }, 2000);
    });
}

// ========== TESTIMONIOS ==========
window.addEventListener('load', function() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = [...document.querySelectorAll('.testimonial')];
    if (testimonials.length === 0) return;
    
    testimonials.forEach((t) => {
        const clone = t.cloneNode(true);
        slider.appendChild(clone);
    });
    
    let offset = 0;
    const speed = 0.3;
    let animationId;
    
    function animate() {
        offset -= speed;
        
        if (Math.abs(offset) >= slider.scrollWidth / 2) {
            offset = 0;
        }
        
        slider.style.transform = `translateX(${offset}px)`;
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
    
    slider.addEventListener('mouseenter', () => cancelAnimationFrame(animationId));
    slider.addEventListener('mouseleave', () => animate());
});

// ========== ANIMACIONES ==========
function initAnimations() {
    // Stats al scroll
    window.addEventListener('scroll', function() {
        const stats = document.querySelectorAll('.stat-number, .stat-text');
        stats.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const visible = rect.top < window.innerHeight - 100;
            if (visible && el.style.animationPlayState !== 'running') {
                el.style.animationPlayState = 'running';
            }
        });
    });
    
    // Reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        
        revealElements.forEach(el => observer.observe(el));
    }
}

// ========== FAQ ==========
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.display = 'none';
            });
            
            if (!isActive) {
                this.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
}

// ========== CARACTERÍSTICAS ESPECÍFICAS PARA MÓVIL ==========
function initMobileSpecificFeatures() {
    console.log('📱 Inicializando características específicas para móvil');
    
    // Asegurar que el header tenga los estilos correctos en móvil
    if (header) {
        header.style.backgroundColor = 'var(--white)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    // Verificar que el menú tenga overlay
    if (!menuOverlay && navMenu) {
        // Crear overlay dinámicamente si no existe
        const overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
        menuOverlay = overlay;
        
        // Re-inicializar eventos con el overlay
        if (navMenu.classList.contains('active')) {
            overlay.classList.add('active');
        }
        
        overlay.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Verificar que exista el botón de cerrar
    if (!closeMenuBtn && navMenu) {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<span></span><span></span>';
        
        // Buscar el header del menú móvil
        const mobileHeader = navMenu.querySelector('.mobile-menu-header');
        if (mobileHeader) {
            mobileHeader.appendChild(closeBtn);
            closeMenuBtn = closeBtn;
            
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                if (menuOverlay) menuOverlay.classList.remove('active');
                document.body.style.overflow = '';
                document.body.classList.remove('menu-open');
            });
        }
    }
}

// ========== EVENT LISTENER GLOBAL DE RESPALDO ==========
// Esto capturará cualquier clic en el botón Calendly que no haya sido capturado
document.addEventListener('click', function(e) {
    // Verificar si el clic fue en un botón Calendly o dentro de él
    const target = e.target;
    const isCalendlyBtn = target.id === 'btnAbrirCalendly' || 
                         target.closest('#btnAbrirCalendly');
    
    if (isCalendlyBtn) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🎯 Click GLOBAL detectado en botón Calendly (respaldo)');
        
        // Obtener el botón real
        const btn = target.id === 'btnAbrirCalendly' ? target : target.closest('#btnAbrirCalendly');
        
        // Cerrar menú móvil si está abierto
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
        }
        
        // Mostrar Calendly, ocultar contenido
        if (contenido) contenido.style.display = 'none';
        if (calendly) calendly.style.display = 'block';
        if (footer) footer.style.display = 'none';
        
        // Scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        return false;
    }
});

console.log('✅ Script de fix Calendly cargado');

document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.getElementById("ignis-chat-toggle");
  const chatWindow = document.getElementById("ignis-chat-window");
  const chatClose = document.getElementById("ignis-chat-close");
  const chatInput = document.getElementById("ignis-chat-input");
  const chatSend = document.getElementById("ignis-chat-send");
  const chatMessages = document.getElementById("ignis-chat-messages");
  const chatTooltip = document.getElementById("ignis-chat-tooltip");

  const whatsappNumber = "56923641871";

  const state = {
    area: "",
    hasDocuments: "",
    recent: "",
    wantsWhatsApp: "",
    clientName: "",
    city: "",
    phone: "",
    contactTime: "",
    memory: [],
    guidedMode: false,
    guidedStep: 0,
    invitationShown: false
  };

  function resetGuidedData() {
    state.area = "";
    state.hasDocuments = "";
    state.recent = "";
    state.wantsWhatsApp = "";
    state.clientName = "";
    state.city = "";
    state.phone = "";
    state.contactTime = "";
    state.guidedStep = 0;
  }

  if (chatToggle && chatWindow) {
    chatToggle.addEventListener("click", () => {
      chatWindow.classList.toggle("hidden");

      if (chatTooltip) chatTooltip.classList.add("hidden");

      if (!chatWindow.classList.contains("hidden")) {
        setTimeout(() => {
          if (chatInput) chatInput.focus();
        }, 250);

        if (!state.invitationShown) {
          setTimeout(() => {
            addBotMessage("Si quieres, puedo hacerte unas preguntas breves para orientarte mejor.");
            setTimeout(() => {
              addQuickButtons([
                { label: "Sí, comenzar", value: "Iniciar evaluación" },
                { label: "Solo orientación", value: "Solo quiero orientación general" },
                { label: "Solo contacto", value: "Solo quiero contacto" }
              ]);
            }, 350);
          }, 700);
          state.invitationShown = true;
        }
      }
    });
  }

  if (chatClose && chatWindow) {
    chatClose.addEventListener("click", () => {
      chatWindow.classList.add("hidden");
    });
  }

  if (chatSend) {
    chatSend.addEventListener("click", sendMessage);
  }

  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });
  }

  setTimeout(() => {
    if (chatTooltip) chatTooltip.classList.remove("hidden");
  }, 900);

  window.sendQuickMessage = function (text) {
    if (!chatInput) return;
    chatInput.value = text;
    sendMessage();
  };

  function sendMessage() {
    if (!chatInput || !chatMessages) return;

    const userText = chatInput.value.trim();
    if (!userText) return;

    state.memory.push(userText);
    addMessage(userText, "user");
    chatInput.value = "";

    const typingId = addTyping();

    setTimeout(() => {
      removeTyping(typingId);
      processMessage(userText);
    }, 900);
  }

  function processMessage(input) {
    const text = normalizeText(input);

    if (isGreeting(text)) {
      addBotMessage(getGreetingResponse(), true);
      return;
    }

    if (text.includes("solo quiero contacto")) {
      addBotMessage("Perfecto. Puedes escribirnos directamente para recibir atención más rápida.");
      addBotMessage(whatsappSmartButton("Contacto directo por WhatsApp"), true);
      return;
    }

    if (text.includes("solo quiero orientacion general") || text.includes("solo quiero orientación general")) {
      addBotMessage("Claro. Puedes contarme brevemente si tu consulta es laboral, familiar, civil o penal, y te orientaré de forma general.");
      addQuickButtons([
        { label: "Laboral", value: "Mi consulta es laboral" },
        { label: "Familiar", value: "Mi consulta es familiar" },
        { label: "Civil", value: "Mi consulta es civil" },
        { label: "Penal", value: "Mi consulta es penal" }
      ]);
      return;
    }

    if (text.includes("iniciar evaluacion")) {
      startGuidedFlow();
      return;
    }

    if (state.guidedMode) {
      handleGuidedFlow(input);
      return;
    }

    const quick = detectGeneralIntent(text);
    addBotMessage(quick, true);
  }

  function isGreeting(text) {
    return containsAny(text, [
      "hola",
      "buenos dias",
      "buenas tardes",
      "buenas noches",
      "buen dia",
      "buenas"
    ]);
  }

  function getGreetingResponse() {
    const responses = [
      "Hola, bienvenido a <strong>Asesoría Legal Ignis</strong>. Puedo darte orientación general o, si prefieres, iniciar una evaluación breve para entender mejor tu consulta.<br><br>" + greetingButtons(),
      "Hola, gracias por escribirnos. Si quieres, puedo orientarte de forma general o hacerte unas preguntas breves para derivarte mejor.<br><br>" + greetingButtons(),
      "Bienvenido a Asesoría Legal Ignis. Estoy aquí para ayudarte con una orientación inicial o con una evaluación breve de tu consulta.<br><br>" + greetingButtons()
    ];

    const index = Math.floor(Math.random() * responses.length);
    return responses[index];
  }

  function greetingButtons() {
    return `
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
        <button type="button" onclick="sendQuickMessage('Solo quiero orientación general')" style="border:none;background:#D4AF37;color:#0A2463;font-weight:700;border-radius:10px;padding:10px 12px;cursor:pointer;">
          Orientación general
        </button>
        <button type="button" onclick="sendQuickMessage('Iniciar evaluación')" style="border:none;background:#0A2463;color:#fff;font-weight:700;border-radius:10px;padding:10px 12px;cursor:pointer;">
          Iniciar evaluación breve
        </button>
      </div>
    `;
  }

  function startGuidedFlow() {
    resetGuidedData();
    state.guidedMode = true;
    state.guidedStep = 1;

    addBotMessage("Comencemos. ¿Tu consulta es laboral, familiar, civil o penal?");
    addQuickButtons([
      { label: "Laboral", value: "Mi consulta es laboral" },
      { label: "Familiar", value: "Mi consulta es familiar" },
      { label: "Civil", value: "Mi consulta es civil" },
      { label: "Penal", value: "Mi consulta es penal" }
    ]);
  }

  function handleGuidedFlow(input) {
    const text = normalizeText(input);

    if (state.guidedStep === 1) {
      if (containsAny(text, ["laboral", "trabajo", "despido", "finiquito"])) {
        state.area = "Laboral";
      } else if (containsAny(text, ["familiar", "familia", "divorcio", "pension", "alimentos"])) {
        state.area = "Familiar";
      } else if (containsAny(text, ["civil", "deuda", "deudas", "contrato", "arriendo"])) {
        state.area = "Civil";
      } else if (containsAny(text, ["penal", "delito", "denuncia", "carabineros", "fiscalia", "detenido", "detencion", "acusacion"])) {
        state.area = "Penal";
      } else {
        addBotMessage("No logré identificar bien el área. ¿Tu consulta es laboral, familiar, civil o penal?");
        return;
      }

      state.guidedStep = 2;
      addBotMessage(`Entiendo. Tu consulta parece ser del área ${state.area}. ¿Tienes documentos o antecedentes relacionados?`);
      addQuickButtons([
        { label: "Sí, tengo documentos", value: "Sí, tengo documentos" },
        { label: "No todavía", value: "No tengo documentos" }
      ]);
      return;
    }

    if (state.guidedStep === 2) {
      const cleanText = normalizeText(input);

      if (
        cleanText === "no" ||
        cleanText === "no todavia" ||
        cleanText === "no todavía" ||
        cleanText === "no tengo documentos" ||
        cleanText === "no tengo antecedentes"
      ) {
        state.hasDocuments = "No";
      } else if (
        cleanText === "si" ||
        cleanText === "sí" ||
        cleanText === "si tengo documentos" ||
        cleanText === "sí tengo documentos" ||
        cleanText === "tengo documentos" ||
        cleanText === "tengo antecedentes"
      ) {
        state.hasDocuments = "Sí";
      } else {
        addBotMessage("Por favor indícame si tienes documentos o antecedentes del caso.");
        return;
      }

      state.guidedStep = 3;
      addBotMessage("Gracias. ¿Ocurrió hace poco o ya pasó hace bastante tiempo?");
      addQuickButtons([
        { label: "Ocurrió hace poco", value: "Ocurrió hace poco" },
        { label: "Pasó hace tiempo", value: "Pasó hace tiempo" }
      ]);
      return;
    }

    if (state.guidedStep === 3) {
      if (containsAny(text, ["hace poco", "reciente", "recien", "recién", "ocurrio hace poco", "ocurrió hace poco"])) {
        state.recent = "Reciente";
      } else if (containsAny(text, ["hace tiempo", "antiguo", "paso hace tiempo", "pasó hace tiempo"])) {
        state.recent = "No reciente";
      } else {
        addBotMessage("Indícame si ocurrió hace poco o si ya pasó hace tiempo.");
        return;
      }

      state.guidedStep = 4;
      addBotMessage(buildDiagnosis(), true);

      setTimeout(() => {
        addBotMessage("¿Quieres que te contacten por WhatsApp?");
        addQuickButtons([
          { label: "Sí, por WhatsApp", value: "Sí, quiero que me contacten por WhatsApp" },
          { label: "Continuar", value: "Continuar evaluación" }
        ]);
      }, 400);
      return;
    }

    if (state.guidedStep === 4) {
      if (containsAny(text, ["si", "sí", "whatsapp", "quiero que me contacten"])) {
        state.wantsWhatsApp = "Sí";
      } else if (containsAny(text, ["continuar", "continuar evaluacion", "continuar evaluación"])) {
        state.wantsWhatsApp = "Sí";
      } else {
        addBotMessage("Puedes indicar si quieres continuar por WhatsApp.");
        return;
      }

      state.guidedStep = 5;
      addBotMessage("Perfecto. ¿Cuál es tu nombre?");
      return;
    }

    if (state.guidedStep === 5) {
      state.clientName = input.trim();
      state.guidedStep = 6;
      addBotMessage(`Gracias, ${escapeHtml(state.clientName)}. ¿Cuál es tu comuna o ciudad?`);
      return;
    }

    if (state.guidedStep === 6) {
      state.city = input.trim();
      state.guidedStep = 7;
      addBotMessage("Gracias. ¿Cuál es tu teléfono de contacto?");
      return;
    }

    if (state.guidedStep === 7) {
      state.phone = input.trim();
      state.guidedStep = 8;
      addBotMessage("Perfecto. ¿Cuál es el mejor horario para contactarte?");
      addQuickButtons([
        { label: "Mañana", value: "Mañana" },
        { label: "Tarde", value: "Tarde" },
        { label: "Noche", value: "Noche" }
      ]);
      return;
    }

    if (state.guidedStep === 8) {
      state.contactTime = input.trim();
      state.guidedStep = 9;

      addBotMessage(
        `Gracias, ${escapeHtml(state.clientName)}. Tu consulta ha sido registrada correctamente.<br><br>Un miembro del equipo de <strong>Asesoría Legal Ignis</strong> revisará la información entregada y se pondrá en contacto contigo para brindarte una orientación inicial.`,
        true
      );

      addBotMessage(buildContactMessage(), true);
      state.guidedMode = false;
    }
  }

  function buildDiagnosis() {
    let urgency = state.recent === "Reciente" ? "Media/Alta" : "Media";
    let readiness = state.hasDocuments === "Sí" ? "Buena" : state.hasDocuments === "No" ? "Inicial" : "No definido";
    let areaText = state.area || "General";

    return `
      <div class="ignis-analysis-card">
        <div class="ignis-analysis-title">Diagnóstico inicial orientativo</div>
        Área detectada: <strong>${areaText}</strong><br>
        Nivel preliminar de urgencia: <strong>${urgency}</strong><br>
        Estado de antecedentes: <strong>${readiness}</strong><br><br>
        Esta evaluación es solo informativa y sirve para orientar el primer contacto con el estudio.
      </div>
    `;
  }

  function buildContactMessage() {
    const text = `Hola, soy ${state.clientName || "un visitante"}.
Vengo desde la web de Asesoría Legal Ignis.
Mi consulta parece ser del área: ${state.area || "No especificada"}.
Tengo documentos: ${state.hasDocuments === "Sí" ? "Sí" : state.hasDocuments === "No" ? "No" : "No indicado"}.
Ocurrió: ${state.recent || "No indicado"}.
Comuna o ciudad: ${state.city || "No indicada"}.
Teléfono de contacto: ${state.phone || "No indicado"}.
Mejor horario para contactar: ${state.contactTime || "No indicado"}.
Necesito orientación.`;

    const encoded = encodeURIComponent(text);

    return `
      <div class="ignis-analysis-card">
        <div class="ignis-analysis-title">Siguiente paso recomendado</div>
        Puedes continuar tu atención con un resumen inicial ya preparado para WhatsApp.
        <br>
        <a class="ignis-whatsapp-link" href="https://wa.me/${whatsappNumber}?text=${encoded}" target="_blank" rel="noopener noreferrer">
          Enviar resumen por WhatsApp
        </a>
      </div>
    `;
  }

  function whatsappSmartButton(label) {
    const text = encodeURIComponent("Hola, vengo desde la página de Asesoría Legal Ignis y necesito orientación.");
    return `<a class="ignis-whatsapp-link" href="https://wa.me/${whatsappNumber}?text=${text}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }

  function detectGeneralIntent(text) {
    if (containsAny(text, ["laboral", "despido", "finiquito", "trabajo"])) {
      return "Tu consulta parece ser laboral. Si quieres, puedo hacerte unas preguntas breves para orientarte mejor." + quickStartEval();
    }

    if (containsAny(text, ["familia", "divorcio", "pension", "alimentos", "visitas"])) {
      return "Tu consulta parece relacionarse con familia. Puedo ayudarte con una evaluación inicial guiada." + quickStartEval();
    }

    if (containsAny(text, ["civil", "deuda", "deudas", "contrato", "arriendo"])) {
      return "Tu consulta parece ser civil. Si quieres, puedo hacerte algunas preguntas para orientarte mejor." + quickStartEval();
    }

    if (containsAny(text, ["penal", "delito", "denuncia", "carabineros", "fiscalia", "detenido", "detencion", "acusacion"])) {
      return "Tu consulta parece relacionarse con penal. Puedo ayudarte con una orientación inicial guiada." + quickStartEval();
    }

    if (containsAny(text, ["contacto", "whatsapp", "telefono", "correo"])) {
      return "Puedes escribirnos directamente para una atención más rápida.<br>" + whatsappSmartButton("Hablar por WhatsApp");
    }

    return "Puedo orientarte de forma general o iniciar una evaluación breve para entender mejor tu consulta." + quickStartEval();
  }

  function quickStartEval() {
    return `<br><br><button type="button" onclick="sendQuickMessage('Iniciar evaluación')" style="border:none;background:#D4AF37;color:#0A2463;font-weight:700;border-radius:10px;padding:10px 12px;cursor:pointer;">Iniciar evaluación guiada</button>`;
  }

  function addQuickButtons(buttons) {
    const wrapper = document.createElement("div");
    wrapper.className = "ignis-quick-options";

    buttons.forEach(btn => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = btn.label;
      button.addEventListener("click", () => {
        sendQuickMessage(btn.value);
      });
      wrapper.appendChild(button);
    });

    chatMessages.appendChild(wrapper);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addTyping() {
    const typing = document.createElement("div");
    typing.className = "ignis-msg bot ignis-typing";

    const bubble = document.createElement("div");
    bubble.className = "ignis-bubble";
    bubble.innerHTML = `Ignis está escribiendo <span class="ignis-dots"><span></span><span></span><span></span></span>`;

    typing.appendChild(bubble);
    chatMessages.appendChild(typing);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typing;
  }

  function removeTyping(typingElement) {
    if (typingElement && typingElement.parentNode) {
      typingElement.parentNode.removeChild(typingElement);
    }
  }

  function addMessage(text, sender, allowHTML = false) {
    const msg = document.createElement("div");
    msg.className = `ignis-msg ${sender}`;

    const bubble = document.createElement("div");
    bubble.className = "ignis-bubble";

    if (allowHTML) {
      bubble.innerHTML = text;
    } else {
      bubble.textContent = text;
    }

    msg.appendChild(bubble);
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function addBotMessage(text, allowHTML = false) {
    addMessage(text, "bot", allowHTML);
  }

  function containsAny(text, keywords) {
    text = normalizeText(text);
    return keywords.some(keyword => text.includes(normalizeText(keyword)));
  }

  function normalizeText(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\w\s]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});




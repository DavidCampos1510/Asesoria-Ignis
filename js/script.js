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
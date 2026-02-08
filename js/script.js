// ========== PRELOADER ==========
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
});

// ========== MENÚ HAMBURGUESA Y NAVEGACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
    // Elementos principales
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.getElementById('header');
    
    // Función para cerrar menú móvil
    function closeMobileMenu() {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.classList.remove('menu-open');
    }
    
    // Función para abrir menú móvil
    function openMobileMenu() {
        if (hamburger) hamburger.classList.add('active');
        if (navMenu) navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('menu-open');
    }
    
    // Toggle menú hamburguesa
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    // ========== NAVEGACIÓN SUAVE PARA TODOS LOS ENLACES ==========
    function setupSmoothNavigation() {
        // Seleccionar TODOS los enlaces internos
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
                    closeMobileMenu();
                    
                    // Calcular posición con offset para header
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar URL sin recargar
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
    // Configurar navegación al cargar
    setupSmoothNavigation();
    
    // ========== MANEJO DE ENLACES DEL HEADER (Desktop) ==========
    if (header) {
        header.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Si es btnAbrirCalendly, salir (manejado aparte)
            if (link.id === 'btnAbrirCalendly') return;
            
            // Si es enlace interno (#), ya está manejado por setupSmoothNavigation
            if (href && href.startsWith('#')) {
                // Solo asegurar que Calendly esté cerrado
                const calendly = document.getElementById('calendlySection');
                const contenido = document.getElementById('contenidoPrincipal');
                const footer = document.querySelector('footer');
                
                if (calendly) calendly.style.display = 'none';
                if (contenido) contenido.style.display = 'block';
                if (footer) footer.style.display = 'block';
            }
        });
    }
    
    // ========== HEADER SCROLL EFFECT ==========
    if (header) {
        function updateHeaderScroll() {
            if (window.innerWidth > 920) {
                if (window.scrollY > 100) {
                    header.classList.add('header-scrolled', 'sticky');
                } else {
                    header.classList.remove('header-scrolled', 'sticky');
                }
            } else {
                header.classList.remove('header-scrolled', 'sticky');
            }
        }
        
        window.addEventListener('scroll', updateHeaderScroll);
        updateHeaderScroll(); // Ejecutar al cargar
    }
    
    // ========== BOTÓN VOLVER ARRIBA ==========
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
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
    
    // ========== WHATSAPP - CERRAR MENÚ ==========
    document.querySelectorAll('.whatsapp-float, a[href*="whatsapp"]').forEach(btn => {
        btn.addEventListener('click', closeMobileMenu);
    });
});

// ========== CALENDLY FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const btnAbrirCalendly = document.getElementById('btnAbrirCalendly');
    const calendlySection = document.getElementById('calendlySection');
    const contenidoPrincipal = document.getElementById('contenidoPrincipal');
    const footer = document.querySelector('footer');
    
    if (btnAbrirCalendly && calendlySection) {
        btnAbrirCalendly.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            const hamburger = document.querySelector('.hamburger');
            const navMenu = document.querySelector('.nav-menu');
            if (hamburger) hamburger.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            
            // Mostrar Calendly, ocultar contenido y footer
            if (contenidoPrincipal) contenidoPrincipal.style.display = 'none';
            if (calendlySection) calendlySection.style.display = 'block';
            if (footer) footer.style.display = 'none';
            
            // Scroll al inicio
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Forzar carga de Calendly en móviles
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
    
    // Botón volver de Calendly
    const btnCerrarCalendly2 = document.getElementById('btnCerrarCalendly2');
    if (btnCerrarCalendly2) {
        btnCerrarCalendly2.addEventListener('click', function() {
            if (calendlySection) calendlySection.style.display = 'none';
            if (contenidoPrincipal) contenidoPrincipal.style.display = 'block';
            if (footer) footer.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Cuando se agenda en Calendly
    window.addEventListener('message', function(e) {
        if (e.data.event === 'calendly.event_scheduled') {
            if (calendlySection) calendlySection.style.display = 'none';
            if (contenidoPrincipal) contenidoPrincipal.style.display = 'block';
            if (footer) footer.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

// ========== FORMULARIO DE CONTACTO ==========
document.addEventListener('DOMContentLoaded', function() {
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
});

// ========== TESTIMONIOS CARRUSEL ==========
window.addEventListener('load', function() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = [...document.querySelectorAll('.testimonial')];
    if (testimonials.length === 0) return;
    
    // Clonar testimonios para bucle continuo
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

// ========== ANIMACIONES AL SCROLL ==========
window.addEventListener('scroll', function() {
    // Estadísticas
    const stats = document.querySelectorAll('.stat-number, .stat-text');
    stats.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const visible = rect.top < window.innerHeight - 100;
        if (visible && el.style.animationPlayState !== 'running') {
            el.style.animationPlayState = 'running';
        }
    });
    
    // Elementos reveal
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const visible = rect.top < window.innerHeight - 100;
            if (visible) {
                el.classList.add('visible');
            }
        });
    }
});

// ========== FAQ ACCORDION ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Cerrar todas
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.display = 'none';
            });
            
            // Abrir la actual si no estaba activa
            if (!isActive) {
                this.classList.add('active');
                answer.style.display = 'block';
            }
        });
    });
});

// ========== RESPONSIVE HEADER ==========
window.addEventListener('resize', function() {
    const header = document.getElementById('header');
    if (header) {
        if (window.innerWidth <= 920) {
            header.classList.remove('header-scrolled', 'sticky');
        }
    }
});

// ========== MEJORAS PARA MÓVILES ==========
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('select').forEach(select => {
            select.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
            
            select.addEventListener('blur', function() {
                this.style.fontSize = '';
            });
        });
    });
}
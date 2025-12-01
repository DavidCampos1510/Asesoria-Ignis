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


// ========== VALIDACIÓN DE FORMULARIO Y ENVÍO ==========
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return; // Si no existe el formulario, salir

    // Elementos del DOM
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const privacyInput = document.getElementById('privacy');
    const submitBtn = document.getElementById('submitBtn');
    const submitText = document.getElementById('submitText');
    const successMessage = document.getElementById('successMessageBottom'); // usa este ID en HTML

    // Ocultar mensaje de éxito al inicio
    if (successMessage) {
        successMessage.style.display = 'none';
        successMessage.style.transition = 'opacity 0.5s ease';
    }

    // ====== Funciones auxiliares ======
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

    // ====== Validaciones individuales ======
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
        const phoneRegex = /^[0-9+\-\s()]{8,}$/; // acepta +56 9..., ( ), -, etc.
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

    // ====== Eventos en tiempo real ======
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

    // ====== Envío del formulario ======
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPrivacyValid = validatePrivacy();

        if (!(isNameValid && isEmailValid && isPhoneValid && isPrivacyValid)) {
            // Enfocar el primer campo con error
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

        // Crear formulario temporal para envío seguro
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = contactForm.action;
        tempForm.style.display = 'none';

        // Copiar los valores del formulario principal
        Array.from(contactForm.elements).forEach(el => {
            if (el.name && el.type !== 'submit' && el.type !== 'checkbox') {
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = el.name;
                hiddenInput.value = el.value;
                tempForm.appendChild(hiddenInput);
            }
        });

        // Si el checkbox está marcado, incluirlo también
        if (privacyInput && privacyInput.checked) {
            const privacyHidden = document.createElement('input');
            privacyHidden.type = 'hidden';
            privacyHidden.name = 'privacy';
            privacyHidden.value = 'Aceptado';
            tempForm.appendChild(privacyHidden);
        }

        // Campos de configuración FormSubmit
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

        // Mostrar mensaje de éxito visualmente
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.opacity = '1';
        }

        // Limpiar el formulario principal
        contactForm.reset();

        // Enviar formulario temporal
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

// ====== CARRUSEL DE TESTIMONIOS CONTINUO ======
window.addEventListener("load", function () {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  const testimonials = [...document.querySelectorAll(".testimonial")];
  if (testimonials.length === 0) return;

  // Clonar los testimonios para formar un bucle continuo
  testimonials.forEach((t) => {
    const clone = t.cloneNode(true);
    slider.appendChild(clone);
  });

  let offset = 0;
  const speed = 0.3; // Ajusta la velocidad del movimiento
  let animationId;

  function animate() {
    offset -= speed;

    // Reinicio suave cuando llega al final
    if (Math.abs(offset) >= slider.scrollWidth / 2) {
      offset = 0;
    }

    slider.style.transform = `translateX(${offset}px)`;
    animationId = requestAnimationFrame(animate);
  }

  // Iniciar animación
  animate();

  // Pausar al pasar el mouse
  slider.addEventListener("mouseenter", () => cancelAnimationFrame(animationId));

  // Reanudar al salir
  slider.addEventListener("mouseleave", () => animate());
});

// ===== ANIMACIÓN DE ESTADÍSTICAS AL HACER SCROLL =====
window.addEventListener("scroll", function () {
  const stats = document.querySelectorAll(".stat-number, .stat-text");

  stats.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const visible = rect.top < window.innerHeight - 100; // margen antes de entrar a vista

    if (visible && el.style.animationPlayState !== "running") {
      el.style.animationPlayState = "running";
    }
  });
});

 document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            const content = btn.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

// ELEMENTOS
const contenido = document.getElementById("contenidoPrincipal");
const calendly = document.getElementById("calendlySection");
const footer = document.querySelector("footer");

// Asegurar que al cargar la página el footer esté visible
footer.style.display = "block";

// MOSTRAR CALENDLY
document.getElementById("btnAbrirCalendly").addEventListener("click", function(e) {
    e.preventDefault(); // por si el botón tiene href="#"
    contenido.style.display = "none";
    calendly.style.display = "block";
    footer.style.display = "none"; // ⬅ OCULTAR FOOTER
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// BOTÓN VOLVER (solo si existe)
const btnCerrar2 = document.getElementById("btnCerrarCalendly2");
if (btnCerrar2) {
    btnCerrar2.addEventListener("click", function() {
        calendly.style.display = "none";
        calendly.classList.remove("mostrar")
        contenido.style.display = "block";
        footer.style.display = "block"; // ⬅ MOSTRAR FOOTER
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// CUANDO EL CLIENTE AGENDA → VOLVER AL INICIO
window.addEventListener("message", function(e) {
    if (e.data.event === "calendly.event_scheduled") {
        calendly.style.display = "none";
        calendly.classList.add("mostrar");
        contenido.style.display = "block";
        footer.style.display = "block"; // ⬅ MOSTRAR FOOTER TAMBIÉN AQUÍ
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
});

const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

/* 🔥 Cerrar Calendly y navegar correctamente al hacer clic en links del header */
document.querySelectorAll("#header a").forEach(link => {
    link.addEventListener("click", (e) => {

        // Si es el botón de Reservar Hora, no tocamos nada aquí
        if (link.id === "btnAbrirCalendly") {
            return;
        }

        const href = link.getAttribute("href");

        // Siempre cerramos Calendly y mostramos el contenido normal
        calendly.style.display = "none";
        calendly.classList.remove("mostrar");
        contenido.style.display = "block";
        footer.style.display = "block";

        // Si es un enlace a una sección (#home, #services, etc.)
        if (href && href.startsWith("#")) {
            e.preventDefault(); // evitamos el comportamiento por defecto

            const destino = document.querySelector(href);
            if (destino) {
                // Hacemos scroll suave hacia esa sección
                destino.scrollIntoView({ behavior: "smooth" });
            }
        }
        // Si es un enlace externo (WhatsApp, redes, etc.), no hacemos preventDefault
        // y dejamos que funcione normal
    });
});




window.addEventListener("message", function(e) {
    if (e.data.event === "calendly.event_scheduled") {

        // Redirigir a la página principal
        window.location.href = "127.0.0.1:3000/index.html"; // <-- Cambia si tu archivo tiene otro nombre o ruta

    }
});

// Sombra en header al hacer scroll
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");

    if (window.scrollY > 40) header.classList.add("sticky");
    else header.classList.remove("sticky");
});

/* ⭐ Animación de entrada para cada sección */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 }); // se activa cuando el 20% es visible

revealElements.forEach(el => observer.observe(el));

// MENÚ MÓVIL
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Al hacer clic en un enlace → cerrar menú
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

});

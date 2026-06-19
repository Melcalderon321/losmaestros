// ==========================================================================
// LOS MAESTROS - CONTACT PAGE INTERACTIVES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initContactForm();
  initNewsletter();
});

// 1. Mobile Menu Toggle
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navbar.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }
}

// 2. Contact Form Validation & Submission
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreInput = document.getElementById('nombre');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const mensajeInput = document.getElementById('mensaje');

    let isValid = true;
    let errorMsg = '';

    // Simple validations
    if (!nombreInput.value.trim()) {
      isValid = false;
      errorMsg = 'Por favor, ingresá tu nombre completo.';
    } else if (!telefonoInput.value.trim()) {
      isValid = false;
      errorMsg = 'Por favor, ingresá un número de teléfono.';
    } else if (!emailInput.value.trim() || !validateEmail(emailInput.value)) {
      isValid = false;
      errorMsg = 'Por favor, ingresá un correo electrónico válido.';
    }

    if (!isValid) {
      showToast(errorMsg, 'error');
      return;
    }

    // Success response simulation
    showToast(`¡Mensaje enviado con éxito! Nos pondremos en contacto a la brevedad. 🍕`, 'success');
    
    // Clear fields
    nombreInput.value = '';
    telefonoInput.value = '';
    emailInput.value = '';
    if (mensajeInput) mensajeInput.value = '';
  });
}

// Helper to validate email formatting
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// 3. Newsletter subscription
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('emailInput');
      if (emailInput && emailInput.value) {
        showToast(`¡Gracias! Te has suscrito con éxito al boletín informativo. 📬`, 'success');
        emailInput.value = '';
      }
    });
  }
}

// 4. Toast notifications helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Custom toast styling based on type
  if (type === 'error') {
    toast.style.borderLeft = '5px solid #dc3545';
    toast.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation" style="color: #dc3545;"></i>
      <span class="toast-message">${message}</span>
    `;
  } else {
    toast.style.borderLeft = '5px solid var(--primary)';
    toast.innerHTML = `
      <i class="fa-solid fa-circle-check" style="color: #ffc107;"></i>
      <span class="toast-message">${message}</span>
    `;
  }

  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.style.animation = 'toastSlideIn 0.3s reverse forwards cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

// ==========================================================================
// LOS MAESTROS - PRENSA PAGE INTERACTIVES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initVideoPlayer();
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

// 2. Video Player Modal (Real YouTube iframe Integration)
function initVideoPlayer() {
  window.openVideoPlayer = function(youtubeId, title, media) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalVideoTitle');
    const modalMedia = document.getElementById('modalVideoMedia');
    const videoBody = modal ? modal.querySelector('.video-modal-body') : null;
    
    if (modal && modalTitle && modalMedia && videoBody) {
      modalTitle.textContent = title;
      modalMedia.textContent = media;
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Disable scroll background
      
      // Inject actual responsive YouTube player
      videoBody.innerHTML = `
        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; background: #000; border-radius: 8px;">
          <iframe 
            src="https://www.youtube.com/embed/${youtubeId}?autoplay=1" 
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
    }
  };

  window.closeVideoPlayer = function() {
    const modal = document.getElementById('videoModal');
    const videoBody = modal ? modal.querySelector('.video-modal-body') : null;
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scroll
      if (videoBody) {
        videoBody.innerHTML = ''; // Stop the video and clear frame
      }
    }
  };
}

// 3. Newsletter subscription
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('emailInput');
      if (emailInput && emailInput.value) {
        showToast(`¡Gracias! Te has suscrito con éxito al boletín informativo. 📬`);
        emailInput.value = '';
      }
    });
  }
}

// 4. Toast notifications helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-bell"></i>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Auto remove toast
  setTimeout(() => {
    toast.style.animation = 'toastSlideIn 0.3s reverse forwards cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

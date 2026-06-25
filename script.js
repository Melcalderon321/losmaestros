// ==========================================================================
// LOS MAESTROS - INTERACTIVE JAVASCRIPT
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollHighlight();
  initCategorySelectors();
  initAutoCustomSlider();
  initGalleryCarousel();
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

    // Close menu when a link is clicked
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

// 2. Modern Custom Slider Component Logic
const heroImages = [
  'first-slide-bg.jpg',   // Oven fresh pizza (Slide 1)
  'second-slide-bg.jpg',  // Take Away promo background (Slide 2)
  'empanadas-bg.jpg'      // Oven fresh empanadas background (Slide 3)
];

let currentCustomSlide = 0;
let customSlideInterval;

function changeCustomSlide(index) {
  const wrapper = document.getElementById('customSlidesWrapper');
  const dots = document.querySelectorAll('.custom-dot');
  const bgSlides = document.querySelectorAll('.hero-bg-slide');
  const slideItems = document.querySelectorAll('.custom-slide-item');
  
  if (!wrapper) return;

  currentCustomSlide = index;
  // Translate wrapper by multi-slide step: 0% for index 0, -25% for 1, etc.
  wrapper.style.transform = `translateX(-${index * 25}%)`;

  // Cross-fade background images cleanly
  bgSlides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Trigger entering animations for slide content elements
  slideItems.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
  
  // Update active states on dots
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Reset auto slider timer
  clearInterval(customSlideInterval);
  initAutoCustomSlider();
}

function initAutoCustomSlider() {
  customSlideInterval = setInterval(() => {
    let nextIndex = (currentCustomSlide + 1) % 4; // Loops through all 4 slides
    changeCustomSlide(nextIndex);
  }, 7000); // 7 seconds per slide
}

// 3. Category Selector Cards
function initCategorySelectors() {
  const cards = document.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const category = card.getAttribute('data-category');
      showToast(`Filtrando por categoría: ${category.toUpperCase()} 🍕`);
    });
  });
}

// 4. Sizing and Dynamic Price Toggle
function selectSize(btnElement, cardId) {
  const sizeContainer = btnElement.parentElement;
  const sizeButtons = sizeContainer.querySelectorAll('.size-btn');
  
  // Toggle active class on buttons
  sizeButtons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  
  // Update price
  const newPrice = btnElement.getAttribute('data-price');
  const sizeSelected = btnElement.getAttribute('data-size');
  const priceDisplay = document.getElementById(`price-${cardId}`);
  if (priceDisplay) {
    priceDisplay.textContent = newPrice;
  }

  // Update Buy Button argument dynamically
  const cardElement = document.getElementById(`card-${cardId}`);
  const buyBtn = cardElement.querySelector('.btn-buy');
  const productName = cardElement.querySelector('.product-name').textContent;
  
  buyBtn.setAttribute('onclick', `addToCart('${productName}', '${sizeSelected}')`);
}

// 5. Toast Notifications
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

function addToCart(productName, size) {
  const formattedSize = size.charAt(0).toUpperCase() + size.slice(1);
  showToast(`¡${productName} (${formattedSize}) añadida al pedido online! 🍕`);
}

// 6. Video Lightbox Modal
function openVideoModal(title, media) {
  const modal = document.getElementById('videoModal');
  const modalTitle = document.getElementById('modalVideoTitle');
  const modalMedia = document.getElementById('modalVideoMedia');
  
  if (modal && modalTitle && modalMedia) {
    modalTitle.textContent = title;
    modalMedia.textContent = media;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Disable page scrolling
    
    // Simulate loading the video
    const fakePlayer = modal.querySelector('.fake-video-player');
    const spinner = fakePlayer.querySelector('.spinner');
    const text = fakePlayer.querySelector('span');
    const playBtn = fakePlayer.querySelector('.fake-play-btn');

    spinner.style.display = 'block';
    playBtn.style.display = 'none';
    text.textContent = 'Cargando transmisión del reporte de prensa...';

    setTimeout(() => {
      spinner.style.display = 'none';
      playBtn.style.display = 'block';
      text.textContent = `Reproduciendo reporte de "${media}" sobre Los Maestros`;
    }, 1500);
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable page scrolling
  }
}

// 7. Newsletter Subscription Form
function handleNewsletterSubmit(event) {
  event.preventDefault();
  const emailInput = document.getElementById('emailInput');
  if (emailInput && emailInput.value) {
    showToast(`¡Gracias! Te has suscrito con éxito al boletín informativo. 📬`);
    emailInput.value = '';
  }
}

// 8. Navigation Link Scroll Highlight
function initScrollHighlight() {
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      // Calculate scroll offset
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// 9. Select Size Column and update buy button dynamically
function selectCardSize(colElement, cardId) {
  const container = colElement.parentElement;
  const cols = container.querySelectorAll('.size-col');
  
  // Toggle active class on columns
  cols.forEach(col => col.classList.remove('active'));
  colElement.classList.add('active');
  
  // Update Buy Button argument dynamically
  const sizeSelected = colElement.getAttribute('data-size');
  const cardElement = document.getElementById(`card-${cardId}`);
  if (cardElement) {
    const buyBtn = cardElement.querySelector('.btn-buy');
    const productName = cardElement.querySelector('.product-name').textContent;
    buyBtn.setAttribute('onclick', `addToCart('${productName}', '${sizeSelected}')`);
  }
}

// 10. Gallery Carousel Navigation
function initGalleryCarousel() {
  const container = document.getElementById('galleryTrackContainer');
  const prevBtn = document.getElementById('galleryPrevBtn');
  const nextBtn = document.getElementById('galleryNextBtn');
  if (!container) return;

  const scrollAmount = 350;

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}


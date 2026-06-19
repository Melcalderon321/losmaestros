// ==========================================================================
// LOS MAESTROS - MENU PAGE INTERACTIVES
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMenuFilters();
  initSearch();
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

// 2. Menu Tabs and Category Filtering State
let activeCategory = 'pizzas';
let activeSubcategory = 'todas';
let searchQuery = '';

function initMenuFilters() {
  const categoryTabs = document.querySelectorAll('.menu-category-tab');
  const subcategoryTabs = document.querySelectorAll('.menu-subcategory-tab');
  const subcategoriesContainer = document.getElementById('subcategoriesContainer');

  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle category tab active states
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeCategory = tab.getAttribute('data-category');
      
      // If category is pizzas, show subcategories bar. Otherwise hide it.
      if (activeCategory === 'pizzas') {
        if (subcategoriesContainer) subcategoriesContainer.style.display = 'block';
      } else {
        if (subcategoriesContainer) subcategoriesContainer.style.display = 'none';
      }

      // Reset subcategory to 'todas' when category changes
      activeSubcategory = 'todas';
      subcategoryTabs.forEach(t => {
        if (t.getAttribute('data-subcategory') === 'todas') {
          t.classList.add('active');
        } else {
          t.classList.remove('active');
        }
      });

      // Filter the items!
      applyFilters();
    });
  });

  subcategoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle subcategory active states
      subcategoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      activeSubcategory = tab.getAttribute('data-subcategory');
      applyFilters();
    });
  });
}

// 3. Live Text Search Filter
function initSearch() {
  const searchInput = document.getElementById('menuSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
}

// 4. Central Filter Logic
function applyFilters() {
  const cards = document.querySelectorAll('.menu-item-card');
  const noResults = document.getElementById('noResultsMessage');
  let visibleCount = 0;

  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    const subcategory = card.getAttribute('data-subcategory');
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    const productIngredients = card.querySelector('.product-ingredients').textContent.toLowerCase();

    // Check Category Match
    const matchesCategory = (category === activeCategory);

    // Check Subcategory Match (only applicable to pizzas category)
    let matchesSubcategory = true;
    if (activeCategory === 'pizzas' && activeSubcategory !== 'todas') {
      matchesSubcategory = (subcategory === activeSubcategory);
    }

    // Check Search Match
    const matchesSearch = productName.includes(searchQuery) || productIngredients.includes(searchQuery);

    // Combine Filters
    if (matchesCategory && matchesSubcategory && matchesSearch) {
      card.classList.remove('hidden');
      visibleCount++;
    } else {
      card.classList.add('hidden');
    }
  });

  // Display empty state message if no items match
  if (noResults) {
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }
}

// 5. Sizing and Dynamic Price Toggle for Menu Cards
function selectSize(btnElement, cardId) {
  const sizeContainer = btnElement.parentElement;
  const sizeButtons = sizeContainer.querySelectorAll('.size-btn');
  
  // Toggle active class on buttons
  sizeButtons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  
  // Update price display
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

// 6. Toast Notifications & Add To Cart Simulation
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

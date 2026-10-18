/* ==========================================================================
   PREPPILOT GLOBAL APPLICATION INITIALIZER & ENHANCED ACTION ENGINE
   ========================================================================== */

// --- Global Theme Controller ---
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('preppilot_theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    this.updateIcons();
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('preppilot_theme', next);
    this.updateIcons();
    if (typeof Toast !== 'undefined') {
      Toast.info(`Switched to ${next.toUpperCase()} theme mode.`, 'Theme Updated');
    }
  },

  updateIcons() {
    const current = document.documentElement.getAttribute('data-theme');
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.innerHTML = current === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
      btn.setAttribute('title', `Switch to ${current === 'dark' ? 'Light' : 'Dark'} Mode`);
    });
  }
};

ThemeManager.init();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Sidebar Toggle
  const toggleBtn = document.getElementById('mobile-sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
    });
  }

  // 2. Global Search Trigger Button
  const searchTriggers = document.querySelectorAll('.global-search-trigger');
  searchTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (typeof UIComponents !== 'undefined') {
        UIComponents.openGlobalSearch();
      }
    });
  });

  // 3. Highlight Current Active Navigation Link
  const currentPath = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('.sidebar-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith(currentPath)) {
      link.classList.add('active');
    }
  });

  // 4. Attach Form Validation & Character Counters
  if (typeof Validator !== 'undefined') {
    Validator.attachCharCounters();
  }

  // 5. Initialize Theme Button Listeners
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });
});

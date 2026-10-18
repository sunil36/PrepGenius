/* ==========================================================================
   PREPPILOT NOTIFICATIONS & TOAST SYSTEM
   ========================================================================== */

const Toast = {
  container: null,

  init() {
    if (!document.getElementById('toast-container')) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('toast-container');
    }
  },

  show({ title, message, type = 'info', duration = 4000 }) {
    this.init();

    const toast = document.createElement('div');
    toast.className = `toast-custom toast-${type}`;

    let iconClass = 'bi-info-circle-fill text-info';
    if (type === 'success') iconClass = 'bi-check-circle-fill text-success';
    if (type === 'error') iconClass = 'bi-exclamation-octagon-fill text-danger';
    if (type === 'warning') iconClass = 'bi-exclamation-triangle-fill text-warning';

    toast.innerHTML = `
      <div style="font-size: 18px; margin-top: 2px;">
        <i class="bi ${iconClass}"></i>
      </div>
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 13px; color: var(--color-text-primary); margin-bottom: 2px;">
          ${title || (type.charAt(0).toUpperCase() + type.slice(1))}
        </div>
        <div style="font-size: 13px; color: var(--color-text-secondary); line-height: 1.4;">
          ${message}
        </div>
      </div>
      <button class="btn-ghost" style="padding: 2px 6px; border-radius: 4px; font-size: 14px; cursor: pointer;" onclick="this.parentElement.remove()">
        <i class="bi bi-x"></i>
      </button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  },

  success(message, title = 'Success') {
    this.show({ title, message, type: 'success' });
  },

  error(message, title = 'Error') {
    this.show({ title, message, type: 'error' });
  },

  warning(message, title = 'Warning') {
    this.show({ title, message, type: 'warning' });
  },

  info(message, title = 'Information') {
    this.show({ title, message, type: 'info' });
  }
};

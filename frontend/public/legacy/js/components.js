/* ==========================================================================
   PREPPILOT GLOBAL COMPONENT BUILDERS (MODALS, DIALOGS, SEARCH)
   ========================================================================== */

const UIComponents = {
  // Confirmation Modal Generator with Cascading Dependency Warnings
  confirmDelete({ title, message, warningCount = 0, warningDetails = [], onConfirm }) {
    let modal = document.getElementById('global-confirm-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'global-confirm-modal';
      modal.className = 'modal-backdrop-custom';
      document.body.appendChild(modal);
    }

    let warningHtml = '';
    if (warningCount > 0) {
      warningHtml = `
        <div class="callout callout-warning mt-3 mb-3 text-left">
          <div style="font-weight: 600; font-size: 13px; margin-bottom: 4px;">
            <i class="bi bi-exclamation-triangle-fill"></i> Warning: Item has dependent child content
          </div>
          <div style="font-size: 12px; color: var(--color-warning-dark);">
            Deleting this item will affect:
            <ul style="padding-left: 18px; margin-top: 4px;">
              ${warningDetails.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="modal-dialog-custom">
        <div class="modal-header-custom">
          <h3 style="font-size: 16px; font-weight: 700; color: var(--color-danger); display: flex; align-items: center; gap: 8px;">
            <i class="bi bi-trash3-fill"></i> ${title || 'Confirm Deletion'}
          </h3>
          <button class="btn-ghost" style="padding: 2px 6px;" onclick="UIComponents.closeModal('global-confirm-modal')">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
        <div class="modal-body-custom">
          <p style="color: var(--color-text-secondary); font-size: 14px;">
            ${message || 'Are you sure you want to delete this item? This action cannot be undone.'}
          </p>
          ${warningHtml}
        </div>
        <div class="modal-footer-custom">
          <button class="btn btn-secondary btn-sm" onclick="UIComponents.closeModal('global-confirm-modal')">Cancel</button>
          <button id="modal-confirm-action-btn" class="btn btn-danger btn-sm">
            <i class="bi bi-trash3"></i> Delete
          </button>
        </div>
      </div>
    `;

    modal.classList.add('show');

    document.getElementById('modal-confirm-action-btn').onclick = () => {
      UIComponents.closeModal('global-confirm-modal');
      if (typeof onConfirm === 'function') onConfirm();
    };
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('show');
  },

  // Skeleton Table Generator
  renderSkeletonTable(containerId, rows = 5, cols = 5) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '<div class="table-container"><table class="table"><thead><tr>';
    for (let c = 0; c < cols; c++) {
      html += `<th><div class="skeleton skeleton-text" style="width: 70px; height: 12px;"></div></th>`;
    }
    html += '</tr></thead><tbody>';
    for (let r = 0; r < rows; r++) {
      html += '<tr>';
      for (let c = 0; c < cols; c++) {
        html += `<td><div class="skeleton skeleton-text" style="width: ${c === 0 ? '120px' : '80px'};"></div></td>`;
      }
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    container.innerHTML = html;
  },

  // Global Command-Palette Search Modal
  openGlobalSearch() {
    let searchModal = document.getElementById('global-search-modal');
    if (!searchModal) {
      searchModal = document.createElement('div');
      searchModal.id = 'global-search-modal';
      searchModal.className = 'modal-backdrop-custom';
      document.body.appendChild(searchModal);
    }

    searchModal.innerHTML = `
      <div class="modal-dialog-custom modal-dialog-lg" style="margin-top: -10vh;">
        <div style="padding: 16px 20px; border-bottom: 1px solid var(--color-border); display: flex; align-items: center; gap: 12px;">
          <i class="bi bi-search text-muted" style="font-size: 18px;"></i>
          <input type="text" id="global-search-input" class="form-control" placeholder="Search topics, questions, jobs, resumes, modules..." style="border: none; font-size: 16px; padding: 0; box-shadow: none;" autofocus>
          <span class="search-shortcut">ESC</span>
        </div>
        <div id="global-search-results" style="max-height: 380px; overflow-y: auto; padding: 12px 16px;">
          <div class="text-xs text-muted fw-semibold mb-2" style="letter-spacing: 0.05em;">QUICK NAVIGATION</div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <a href="../user/learn.html" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-book text-primary"></i> Learning Paths & Technologies</span>
              <span class="badge badge-neutral">Learn</span>
            </a>
            <a href="../user/practice.html" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-lightning text-warning"></i> Question Bank & MCQs</span>
              <span class="badge badge-neutral">Practice</span>
            </a>
            <a href="../user/jobs.html" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-briefcase text-success"></i> Recommended Job Openings</span>
              <span class="badge badge-neutral">Jobs</span>
            </a>
            <a href="../user/automation.html" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-robot text-info"></i> Auto-Apply Automation Rules</span>
              <span class="badge badge-neutral">Automation</span>
            </a>
            <a href="../admin/dashboard.html" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-speedometer2 text-danger"></i> Admin CMS & Control Center</span>
              <span class="badge badge-primary">Admin</span>
            </a>
          </div>
        </div>
        <div style="padding: 10px 16px; background-color: var(--color-background-subtle); border-top: 1px solid var(--color-border); font-size: 11px; color: var(--color-text-muted); display: flex; justify-content: space-between;">
          <span>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
          <span>Press <kbd>ESC</kbd> to close</span>
        </div>
      </div>
    `;

    searchModal.classList.add('show');
    const input = document.getElementById('global-search-input');
    input.focus();

    input.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resultsBox = document.getElementById('global-search-results');
      if (!q) return;

      const topics = MockDB.get(MockDB.STORAGE_KEYS.TOPICS).filter(t => t.name.toLowerCase().includes(q));
      const jobs = MockDB.get(MockDB.STORAGE_KEYS.JOBS).filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));

      let resHtml = `<div class="text-xs text-muted fw-semibold mb-2">RESULTS FOR "${q}"</div><div class="d-flex flex-column gap-1">`;
      if (topics.length === 0 && jobs.length === 0) {
        resHtml += `<div class="text-center p-4 text-muted text-sm">No direct matches found for "${q}". Try searching "Python", "Stripe", or "OOP".</div>`;
      } else {
        topics.forEach(t => {
          resHtml += `
            <a href="../user/topic.html?id=${t.id}" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-file-earmark-code text-primary"></i> ${t.name} <small class="text-muted">(${t.techName})</small></span>
              <span class="badge badge-primary">Topic</span>
            </a>
          `;
        });
        jobs.forEach(j => {
          resHtml += `
            <a href="../user/job-detail.html?id=${j.id}" class="p-2 rounded d-flex align-items-center justify-content-between hover-bg" style="color: var(--color-text-primary); text-decoration: none;">
              <span class="d-flex align-items-center gap-2"><i class="bi bi-building text-success"></i> ${j.title} at ${j.company}</span>
              <span class="badge badge-success">Job</span>
            </a>
          `;
        });
      }
      resHtml += `</div>`;
      resultsBox.innerHTML = resHtml;
    });

    searchModal.onclick = (e) => {
      if (e.target === searchModal) UIComponents.closeModal('global-search-modal');
    };
  }
};

// Keyboard listener for Cmd/Ctrl+K
window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    UIComponents.openGlobalSearch();
  }
  if (e.key === 'Escape') {
    UIComponents.closeModal('global-search-modal');
    UIComponents.closeModal('global-confirm-modal');
  }
});

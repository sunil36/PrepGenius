
  async function loadAdminDashboard() {
    const { data: logs } = await API.auditLogs.list();
    const container = document.getElementById('admin-dashboard-audits');
    container.innerHTML = logs.slice(0, 3).map(l => `
      <div class="p-3 rounded" style="background: var(--color-background-subtle); border: 1px solid var(--color-border);">
        <div class="d-flex justify-content-between text-xs mb-1">
          <strong>${l.user}</strong>
          <span class="text-muted">${l.timestamp}</span>
        </div>
        <div class="text-xs text-secondary"><span class="badge badge-neutral">${l.action}</span> ${l.entity}</div>
      </div>
    `).join('');
  }
  loadAdminDashboard();

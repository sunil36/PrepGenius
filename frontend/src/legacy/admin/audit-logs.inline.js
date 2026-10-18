
  async function loadAuditLogs() {
    const { data: logs } = await API.auditLogs.list();
    const tbody = document.getElementById('audit-logs-table-body');
    tbody.innerHTML = logs.map(l => `
      <tr>
        <td class="text-xs text-muted" style="white-space: nowrap;">${l.timestamp}</td>
        <td><strong class="text-sm">${l.user}</strong></td>
        <td><span class="badge badge-primary">${l.action}</span></td>
        <td class="text-sm">${l.entity}</td>
        <td class="text-xs text-secondary">${l.oldValue} → ${l.newValue}</td>
        <td class="text-xs" style="font-family: var(--font-mono);">${l.ip}</td>
      </tr>
    `).join('');
  }
  loadAuditLogs();

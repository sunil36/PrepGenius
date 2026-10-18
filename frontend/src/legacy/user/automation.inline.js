
  async function loadLogs() {
    const { data: logs } = await API.automation.getLogs();
    const container = document.getElementById('automation-logs-container');
    container.innerHTML = logs.map(l => `
      <div class="p-3 rounded d-flex align-items-start gap-3" style="background: var(--color-background-subtle); border: 1px solid var(--color-border);">
        <div style="font-size: 16px; color: var(--color-primary); margin-top: 2px;">
          <i class="bi bi-clock-history"></i>
        </div>
        <div style="flex: 1;">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <strong style="font-size: 13px; color: var(--color-text-primary);">${l.action}</strong>
            <span class="text-xs text-muted">${l.timestamp}</span>
          </div>
          <div class="text-xs text-secondary">${l.detail}</div>
        </div>
      </div>
    `).join('');
  }

  async function triggerImmediateScan() {
    Toast.info('Connecting to live job feeds...', 'Scan Triggered');
    await API.automation.triggerScan();
    Toast.success('Scanned 64 target career portals. 3 high-match roles queued.', 'Scan Complete');
    loadLogs();
  }

  loadLogs();

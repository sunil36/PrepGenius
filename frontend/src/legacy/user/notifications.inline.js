
  async function loadNotifications() {
    const { data: list } = await API.notifications.list();
    const container = document.getElementById('notifications-list');
    container.innerHTML = list.map(n => `
      <div class="card p-4 d-flex align-items-start gap-3" style="${n.read ? 'opacity: 0.75;' : 'border-left: 4px solid var(--color-primary);'}">
        <div style="font-size: 20px; color: var(--color-primary); margin-top: 2px;">
          <i class="bi ${n.type === 'interview' ? 'bi-calendar-check' : n.type === 'job' ? 'bi-briefcase' : 'bi-robot'}"></i>
        </div>
        <div style="flex: 1;">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h3 style="font-size: 14px; font-weight: 700; margin: 0;">${n.title}</h3>
            <span class="text-xs text-muted">${n.time}</span>
          </div>
          <p class="text-sm text-secondary mb-0">${n.message}</p>
        </div>
      </div>
    `).join('');
  }

  async function markAllNotificationsRead() {
    await API.notifications.markAllRead();
    Toast.success('All notifications marked as read', 'Updated');
    loadNotifications();
  }

  loadNotifications();

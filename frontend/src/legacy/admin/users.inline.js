
  function loadUsers() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.USERS);
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = list.map(u => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./user-detail.html?id=${u.id}" style="color: var(--color-text-primary);">${u.name}</a>
          </div>
          <div class="text-xs text-muted">${u.email} • Last active ${u.lastActive}</div>
        </td>
        <td><span class="badge ${u.role === 'Admin' ? 'badge-danger' : 'badge-primary'}">${u.role}</span></td>
        <td class="text-sm">${u.targetRole}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <div class="progress flex-grow-1" style="width: 80px;"><div class="progress-bar" style="width: ${u.progress}%;"></div></div>
            <span class="text-xs fw-semibold">${u.progress}%</span>
          </div>
        </td>
        <td class="text-xs text-muted">${u.joinedDate}</td>
        <td style="text-align: right;">
          <a href="./user-detail.html?id=${u.id}" class="btn btn-icon-sm btn-ghost" title="Inspect Candidate"><i class="bi bi-eye"></i></a>
          <button class="btn btn-icon-sm btn-ghost" title="Reset Password" onclick="Toast.success('Password reset email dispatched to ${u.email}', 'Dispatched')"><i class="bi bi-key"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadUsers();

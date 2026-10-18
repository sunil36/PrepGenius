
  async function loadAdminApps() {
    const { data: apps } = await API.applications.list();
    const tbody = document.getElementById('admin-apps-table-body');
    tbody.innerHTML = apps.map(a => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">${a.role}</div>
          <div class="text-xs text-muted">${a.company} • Salary: ${a.salary}</div>
        </td>
        <td><span class="badge ${a.stage === 'Interview' ? 'badge-success' : 'badge-primary'}">${a.stage}</span></td>
        <td><span class="badge badge-success">${a.matchScore}% ATS Match</span></td>
        <td class="text-xs text-muted">${a.appliedDate}</td>
        <td class="text-xs text-secondary">${a.nextStep}</td>
      </tr>
    `).join('');
  }
  loadAdminApps();

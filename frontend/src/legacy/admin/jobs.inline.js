
  async function loadAdminJobs() {
    const { data: jobs } = await API.jobs.list();
    const tbody = document.getElementById('admin-jobs-table-body');
    tbody.innerHTML = jobs.map(j => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">${j.title}</div>
          <div class="text-xs text-muted">${j.company}</div>
        </td>
        <td><span class="text-sm">${j.location}</span></td>
        <td><span class="fw-semibold">${j.salary}</span></td>
        <td><span class="badge badge-primary">${j.source}</span></td>
        <td class="text-xs text-muted">${j.postedDate}</td>
        <td style="text-align: right;">
          <a href="../user/job-detail.html?id=${j.id}" class="btn btn-icon-sm btn-ghost" title="Inspect" target="_blank"><i class="bi bi-eye"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Purge" onclick="Toast.info('Job listing archived.', 'Archived')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadAdminJobs();

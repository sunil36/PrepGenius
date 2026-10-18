
  // Render Recommended Jobs dynamically
  async function loadDashboardJobs() {
    const { data: jobs } = await API.jobs.list();
    const tbody = document.getElementById('dashboard-jobs-table');
    tbody.innerHTML = jobs.map(j => `
      <tr>
        <td>
          <div class="fw-semibold text-primary" style="font-size: 14px;">${j.title}</div>
          <div class="text-xs text-muted">${j.company} • Posted ${j.postedDate}</div>
        </td>
        <td><span class="text-sm">${j.location}</span></td>
        <td><span class="fw-medium">${j.salary}</span></td>
        <td><span class="badge ${j.matchScore >= 90 ? 'badge-success' : 'badge-primary'}">${j.matchScore}% Match</span></td>
        <td>
          <a href="./job-detail.html?id=${j.id}" class="btn btn-secondary btn-sm">Review & Apply</a>
        </td>
      </tr>
    `).join('');
  }
  loadDashboardJobs();


  async function loadJobs(query = '') {
    const { data: jobs } = await API.jobs.list({ search: query });
    const container = document.getElementById('jobs-list-container');
    container.innerHTML = jobs.map(j => `
      <div class="card card-hover p-5">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <h2 style="font-size: 18px; font-weight: 700; margin: 0;">
                <a href="./job-detail.html?id=${j.id}" style="color: var(--color-text-primary);">${j.title}</a>
              </h2>
              <span class="badge ${j.matchScore >= 90 ? 'badge-success' : 'badge-primary'}">
                <i class="bi bi-stars"></i> ${j.matchScore}% Match
              </span>
            </div>
            <div class="text-xs text-muted">
              <strong>${j.company}</strong> • ${j.location} • ${j.salary} • Posted ${j.postedDate}
            </div>
          </div>
          <a href="./job-detail.html?id=${j.id}" class="btn btn-primary btn-sm">
            Inspect & Apply <i class="bi bi-arrow-right"></i>
          </a>
        </div>

        <p class="text-sm text-secondary mb-3">${j.description}</p>

        <div class="d-flex flex-wrap align-items-center justify-content-between pt-3" style="border-top: 1px solid var(--color-divider);">
          <div class="d-flex flex-wrap gap-2">
            ${j.skills.map(s => `<span class="badge badge-neutral">${s}</span>`).join('')}
            ${j.missingSkills.length > 0 ? j.missingSkills.map(m => `<span class="badge badge-warning">Skill Gap: ${m}</span>`).join('') : '<span class="badge badge-success">✓ 100% Skill Overlap</span>'}
          </div>
          <span class="text-xs text-muted"><i class="bi bi-link-45deg"></i> Source: ${j.source}</span>
        </div>
      </div>
    `).join('');
  }

  function filterJobs() {
    const q = document.getElementById('job-search-input').value;
    loadJobs(q);
  }

  loadJobs();

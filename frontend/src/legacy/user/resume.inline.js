
  async function loadResumes() {
    const { data: resumes } = await API.resumes.list();
    const container = document.getElementById('resume-cards-list');
    container.innerHTML = resumes.map(r => `
      <div class="card p-5">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <div class="d-flex align-items-center gap-2 mb-1">
              <h2 style="font-size: 18px; font-weight: 700; margin: 0;">${r.title}</h2>
              ${r.isDefault ? '<span class="badge badge-success">Primary Default</span>' : ''}
            </div>
            <div class="text-xs text-muted">Target: ${r.targetRole} • Updated ${r.updatedAt}</div>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="badge badge-success" style="font-size: 13px; padding: 6px 12px;">
              <i class="bi bi-stars"></i> ATS Score: ${r.atsScore}%
            </span>
          </div>
        </div>

        <p class="text-sm text-secondary mb-4">${r.summary}</p>

        <div class="d-flex justify-content-between align-items-center pt-3" style="border-top: 1px solid var(--color-divider);">
          <div class="d-flex gap-2">
            <span class="badge badge-neutral">Skills: ${r.skills.length}</span>
            <span class="badge badge-neutral">Experience: ${r.experience.length} Roles</span>
          </div>
          <div class="d-flex gap-2">
            <a href="./resume-builder.html?id=${r.id}" class="btn btn-secondary btn-sm">
              <i class="bi bi-pencil"></i> Edit in Builder
            </a>
            <button class="btn btn-secondary btn-sm" onclick="Toast.success('Resume downloaded formatted as clean ATS PDF', 'PDF Export')">
              <i class="bi bi-download"></i> Download PDF
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }
  loadResumes();

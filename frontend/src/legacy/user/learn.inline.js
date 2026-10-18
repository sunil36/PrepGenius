
  async function loadLearn() {
    // 1. Learning Paths
    const paths = MockDB.get(MockDB.STORAGE_KEYS.LEARNING_PATHS);
    const pContainer = document.getElementById('learning-paths-container');
    pContainer.innerHTML = paths.map(p => `
      <div class="card p-5">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge badge-primary">${p.badge}</span>
          <span class="text-xs text-muted"><i class="bi bi-clock"></i> ${p.estimatedHours}</span>
        </div>
        <h3 class="h3" style="color: var(--color-primary);">${p.title}</h3>
        <p class="text-sm mb-4">${p.description}</p>
        <div class="d-flex align-items-center justify-content-between p-3 rounded mb-4" style="background: var(--color-background-subtle);">
          <div>
            <div class="fw-bold">${p.modulesCount} Modules • ${p.topicsCount} Topics</div>
            <div class="text-xs text-muted">${p.enrolledCount} Engineers Enrolled</div>
          </div>
          <span class="badge badge-success">${p.completionRate} Avg Completion</span>
        </div>
        <a href="./topic.html" class="btn btn-primary w-100">
          Start Learning Path <i class="bi bi-arrow-right"></i>
        </a>
      </div>
    `).join('');

    // 2. Technologies
    const techs = MockDB.get(MockDB.STORAGE_KEYS.TECHNOLOGIES);
    const tGrid = document.getElementById('technologies-grid');
    tGrid.innerHTML = techs.map(t => `
      <div class="card card-hover p-4">
        <div class="d-flex align-items-center gap-3 mb-3">
          <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--color-primary-light); color: var(--color-primary); display: flex; align-items: center; justify-content: center; font-size: 22px;">
            <i class="bi ${t.icon}"></i>
          </div>
          <div>
            <h3 style="font-size: 16px; margin: 0;">${t.name}</h3>
            <span class="badge badge-neutral">${t.level}</span>
          </div>
        </div>
        <p class="text-sm text-secondary mb-4">${t.description}</p>
        <div class="d-flex justify-content-between align-items-center">
          <span class="text-xs text-muted fw-semibold">${t.questionsCount} Interview Questions</span>
          <a href="./topic.html" class="btn btn-secondary btn-sm">Explore <i class="bi bi-chevron-right"></i></a>
        </div>
      </div>
    `).join('');
  }
  loadLearn();

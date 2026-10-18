
  function loadSubtopics() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.SUBTOPICS);
    const container = document.getElementById('subtopics-list-tree');
    container.innerHTML = list.map(s => `
      <div class="p-4 rounded d-flex align-items-center justify-content-between cursor-pointer hover-bg" style="background: var(--color-background-subtle); border: 1px solid var(--color-border);">
        <div class="d-flex align-items-center gap-3">
          <i class="bi bi-grip-vertical text-muted" style="font-size: 18px;"></i>
          <span class="badge badge-primary">${s.order}</span>
          <strong class="text-sm">${s.title}</strong>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="badge badge-success">${s.status}</span>
          <button class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('Subtopic deleted.', 'Removed')"><i class="bi bi-trash3"></i></button>
        </div>
      </div>
    `).join('');
  }
  loadSubtopics();

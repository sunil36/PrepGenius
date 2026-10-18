
  function loadPaths() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.LEARNING_PATHS);
    const tbody = document.getElementById('paths-table-body');
    tbody.innerHTML = list.map(p => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./learning-path-editor.html?id=${p.id}" style="color: var(--color-text-primary);">${p.title}</a>
          </div>
          <div class="text-xs text-muted">${p.description.slice(0, 60)}...</div>
        </td>
        <td><span class="badge badge-neutral">${p.modulesCount} Modules (${p.topicsCount} Topics)</span></td>
        <td><span class="text-sm">${p.estimatedHours}</span></td>
        <td><span class="fw-bold">${p.enrolledCount} Engineers</span></td>
        <td><span class="badge badge-success">${p.status}</span></td>
        <td style="text-align: right;">
          <a href="./learning-path-editor.html?id=${p.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('Path removed.', 'Deleted')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadPaths();

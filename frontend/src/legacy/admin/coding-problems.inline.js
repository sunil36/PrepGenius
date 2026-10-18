
  function loadCoding() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.CODING);
    const tbody = document.getElementById('coding-table-body');
    tbody.innerHTML = list.map(c => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./coding-editor.html?id=${c.id}" style="color: var(--color-text-primary);">${c.title}</a>
          </div>
          <div class="text-xs text-muted">Tech: ${c.techName} • Multi-threaded concurrency challenge</div>
        </td>
        <td><span class="badge badge-danger">${c.difficulty}</span></td>
        <td class="text-xs text-secondary">${c.constraints}</td>
        <td style="text-align: right;">
          <a href="./coding-editor.html?id=${c.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('Coding problem removed.', 'Deleted')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadCoding();

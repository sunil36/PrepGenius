
  function loadContent() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.CONTENT);
    const tbody = document.getElementById('content-table-body');
    tbody.innerHTML = list.map(c => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./content-editor.html?id=${c.id}" style="color: var(--color-text-primary);">${c.title}</a>
          </div>
          <div class="text-xs text-muted">Topic: Object Oriented Programming • ${c.readTime}</div>
        </td>
        <td><span class="badge badge-primary">${c.type}</span></td>
        <td><span class="badge badge-neutral">${c.difficulty}</span></td>
        <td class="text-sm">${c.author}</td>
        <td><span class="badge badge-success">${c.status}</span></td>
        <td class="text-xs text-muted">${c.updatedAt}</td>
        <td style="text-align: right;">
          <a href="../user/topic.html?id=${c.topicId}" class="btn btn-icon-sm btn-ghost" title="Preview as User" target="_blank"><i class="bi bi-eye"></i></a>
          <a href="./content-editor.html?id=${c.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('Content item removed.', 'Deleted')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadContent();


  async function loadTechnologies() {
    const { data: list } = await API.technologies.list();
    const tbody = document.getElementById('technologies-table-body');
    tbody.innerHTML = list.map(t => `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${t.order}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <i class="bi ${t.icon} text-primary" style="font-size: 18px;"></i>
            <strong>${t.name}</strong>
          </div>
          <div class="text-xs text-muted">${t.slug}</div>
        </td>
        <td><span class="badge badge-neutral">${t.level}</span></td>
        <td><span class="fw-semibold">${t.questionsCount} Questions</span></td>
        <td><span class="badge badge-success">${t.status}</span></td>
        <td style="text-align: right;">
          <a href="./technology-editor.html?id=${t.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="deleteTechnology('${t.id}', '${t.name}', ${t.questionsCount})"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function deleteTechnology(id, name, count) {
    UIComponents.confirmDelete({
      title: 'Delete Technology?',
      message: `Are you sure you want to delete "${name}"?`,
      warningCount: count,
      warningDetails: [`${count} interview questions and associated topics will be removed from candidates.`],
      onConfirm: async () => {
        await API.technologies.delete(id);
        Toast.success(`Technology "${name}" deleted.`, 'Deleted');
        loadTechnologies();
      }
    });
  }

  loadTechnologies();

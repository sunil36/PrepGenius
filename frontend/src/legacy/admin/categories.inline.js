
  async function loadCategories() {
    const { data: list } = await API.categories.list();
    const tbody = document.getElementById('categories-table-body');
    tbody.innerHTML = list.map(c => `
      <tr>
        <td style="font-weight: 700; color: var(--color-text-muted);">${c.displayOrder}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <i class="bi ${c.icon} text-primary" style="font-size: 16px;"></i>
            <strong>${c.name}</strong>
          </div>
          <div class="text-xs text-muted">${c.slug}</div>
        </td>
        <td class="text-sm text-secondary">${c.description}</td>
        <td><span class="badge badge-neutral">${c.count} Techs</span></td>
        <td><span class="badge badge-success">${c.status}</span></td>
        <td style="text-align: right;">
          <a href="./category-editor.html?id=${c.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="deleteCategory('${c.id}', '${c.name}', ${c.count})"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function deleteCategory(id, name, count) {
    UIComponents.confirmDelete({
      title: 'Delete Category Taxonomy?',
      message: `Are you sure you want to delete category "${name}"?`,
      warningCount: count > 0 ? count : 0,
      warningDetails: [`${count} associated technologies and their sub-topics will be detached.`],
      onConfirm: async () => {
        await API.categories.delete(id);
        Toast.success(`Category "${name}" deleted.`, 'Deleted');
        loadCategories();
      }
    });
  }

  loadCategories();

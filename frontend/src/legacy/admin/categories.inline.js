window.loadCategories = async function loadCategories() {
  const tbody = document.getElementById('categories-table-body');
  if (!tbody) return;

  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="text-center py-4 text-muted">
        <span class="spinner-border spinner-border-sm me-2" role="status"></span> Loading categories...
      </td>
    </tr>
  `;

  try {
    let response;
    try {
      response = await fetch('/api/courses/categories', {
        headers: { 'Accept': 'application/json' }
      });
    } catch (proxyErr) {
      response = await fetch('http://127.0.0.1:8080/api/courses/categories', {
        headers: { 'Accept': 'application/json' }
      });
    }

    const result = await response.json();
    const list = Array.isArray(result) ? result : (result.data || []);

    if (!list.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            No categories found. Click <strong>+ Add Category</strong> to create one.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = list.map(c => {
      const name = c.course_name || c.name || 'Untitled';
      const slug = c.slug || '';
      const desc = c.description || '-';
      const order = c.display_order ?? c.displayOrder ?? 0;
      const iconRaw = c.icon_class || c.icon || 'bi-folder2';
      const iconClass = iconRaw.startsWith('bi') ? `bi ${iconRaw}` : iconRaw;
      const isActive = c.active === true || c.active === 1 || c.status === 'active';
      const statusBadge = isActive 
        ? '<span class="badge badge-success">ACTIVE</span>' 
        : '<span class="badge badge-neutral">INACTIVE</span>';
      const techsCount = c.count ?? 0;

      return `
        <tr>
          <td style="font-weight: 700; color: var(--color-text-muted);">${order}</td>
          <td>
            <div class="d-flex align-items-center gap-2">
              <i class="${iconClass} text-primary" style="font-size: 16px;"></i>
              <strong>${name}</strong>
            </div>
            <div class="text-xs text-muted">${slug}</div>
          </td>
          <td class="text-sm text-secondary">${desc}</td>
          <td><span class="badge badge-neutral">${techsCount} Techs</span></td>
          <td>${statusBadge}</td>
          <td style="text-align: right;">
            <a href="./category-editor.html?id=${c.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
            <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="deleteCategory('${c.id}', '${name.replace(/'/g, "\\'")}', ${techsCount})"><i class="bi bi-trash3"></i></button>
          </td>
        </tr>
      `;
    }).join('');

  } catch (err) {
    console.error('Failed to load categories:', err);
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center py-4 text-danger">
          Failed to load categories from API.
        </td>
      </tr>
    `;
  }
};

window.deleteCategory = function deleteCategory(id, name, count) {
  if (typeof UIComponents !== 'undefined' && UIComponents.confirmDelete) {
    UIComponents.confirmDelete({
      title: 'Delete Category Taxonomy?',
      message: `Are you sure you want to delete category "${name}"?`,
      warningCount: count > 0 ? count : 0,
      warningDetails: [`${count} associated technologies and their sub-topics will be detached.`],
      onConfirm: async () => {
        if (typeof API !== 'undefined' && API.categories && API.categories.delete) {
          await API.categories.delete(id).catch(() => {});
        }
        if (typeof Toast !== 'undefined' && Toast.success) {
          Toast.success(`Category "${name}" deleted.`, 'Deleted');
        }
        window.loadCategories();
      }
    });
  } else {
    if (confirm(`Are you sure you want to delete category "${name}"?`)) {
      if (typeof Toast !== 'undefined' && Toast.success) {
        Toast.success(`Category "${name}" deleted.`, 'Deleted');
      }
      window.loadCategories();
    }
  }
};

window.loadCategories();

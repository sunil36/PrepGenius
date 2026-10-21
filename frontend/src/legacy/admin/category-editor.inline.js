window.saveCategory = async function saveCategory() {
  const nameInput = document.getElementById('cat-name');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    if (typeof Toast !== 'undefined' && Toast.error) {
      Toast.error('Category name is required', 'Validation Error');
    } else {
      alert('Category name is required');
    }
    return;
  }

  const slugInput = document.getElementById('cat-slug');
  const rawSlug = slugInput ? slugInput.value.trim() : '';
  const slug = rawSlug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const descInput = document.getElementById('cat-desc');
  const description = descInput ? descInput.value.trim() : '';

  const iconInput = document.getElementById('cat-icon');
  const iconClass = iconInput ? iconInput.value.trim() : 'bi-hdd-network';

  const orderInput = document.getElementById('cat-order');
  const displayOrder = orderInput && orderInput.value ? parseInt(orderInput.value, 10) : 1;

  const payload = {
    course_name: name,
    slug: slug,
    description: description || null,
    icon_class: iconClass || null,
    display_order: isNaN(displayOrder) ? 1 : displayOrder,
    subscription_type: "free",
    active: true,
    deleted_at: null,
    updated_at: null
  };

  const submitButtons = document.querySelectorAll('button[type="submit"], button[onclick*="saveCategory"]');
  submitButtons.forEach(btn => {
    btn.disabled = true;
    btn.dataset.originalHtml = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status"></span> Saving...';
  });

  const isEdit = Boolean(currentEditingId);
  const method = isEdit ? 'PUT' : 'POST';
  const relativeUrl = isEdit 
    ? `/api/courses/category?id=${encodeURIComponent(currentEditingId)}` 
    : '/api/courses/add-course';
  const directUrl = isEdit 
    ? `http://127.0.0.1:8080/api/courses/category?id=${encodeURIComponent(currentEditingId)}` 
    : 'http://127.0.0.1:8080/api/courses/add-course';

  try {
    let response;
    try {
      response = await fetch(relativeUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (proxyError) {
      response = await fetch(directUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = result.detail || result.message || `Request failed with status ${response.status}`;
      if (typeof Toast !== 'undefined' && Toast.error) {
        Toast.error(errorMsg, 'Error');
      } else {
        alert(errorMsg);
      }
      return;
    }

    if (typeof API !== 'undefined' && API.categories && API.categories.save) {
      await API.categories.save({
        id: currentEditingId || undefined,
        name,
        slug,
        description,
        icon: iconClass,
        displayOrder,
        status: 'active'
      }).catch(() => {});
    }

    const successMsg = isEdit 
      ? (result.message || 'Category updated successfully.') 
      : (result.message || 'Category added successfully.');

    if (typeof Toast !== 'undefined' && Toast.success) {
      Toast.success(successMsg, 'Success');
    } else {
      alert(successMsg);
    }

    setTimeout(() => {
      window.location.href = '/admin/categories';
    }, 700);

  } catch (error) {
    console.error('Error saving course:', error);
    const msg = error.message || 'Could not connect to backend API.';
    if (typeof Toast !== 'undefined' && Toast.error) {
      Toast.error(msg, 'Network Error');
    } else {
      alert('Error: ' + msg);
    }
  } finally {
    submitButtons.forEach(btn => {
      btn.disabled = false;
      if (btn.dataset.originalHtml) {
        btn.innerHTML = btn.dataset.originalHtml;
      }
    });
  }
};

let currentEditingId = null;

async function loadCategoryForEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) return;
  currentEditingId = id;

  try {
    let response;
    try {
      response = await fetch(`/api/courses/category-editor?id=${encodeURIComponent(id)}`, {
        headers: { 'Accept': 'application/json' }
      });
    } catch (proxyErr) {
      response = await fetch(`http://127.0.0.1:8080/api/courses/category-editor?id=${encodeURIComponent(id)}`, {
        headers: { 'Accept': 'application/json' }
      });
    }

    if (!response.ok) {
      console.warn(`Could not load category id ${id}, status: ${response.status}`);
      return;
    }

    const result = await response.json();
    const data = result.data || result;

    if (data) {
      const nameInput = document.getElementById('cat-name');
      const slugInput = document.getElementById('cat-slug');
      const descInput = document.getElementById('cat-desc');
      const iconInput = document.getElementById('cat-icon');
      const orderInput = document.getElementById('cat-order');

      if (nameInput) nameInput.value = data.course_name || data.name || '';
      if (slugInput) slugInput.value = data.slug || '';
      if (descInput) descInput.value = data.description || '';
      if (iconInput) iconInput.value = data.icon_class || data.icon || 'bi-hdd-network';
      if (orderInput) orderInput.value = data.display_order ?? data.displayOrder ?? 1;

      const pageHeading = document.querySelector('.page-header h1');
      if (pageHeading) pageHeading.textContent = 'Edit Category Taxonomy';

      const saveBtns = document.querySelectorAll('button[type="submit"], button[onclick*="saveCategory"]');
      saveBtns.forEach(btn => {
        btn.innerHTML = '<i class="bi bi-floppy"></i> Update Category';
      });
    }
  } catch (err) {
    console.error('Error fetching category for edit:', err);
  }
}

// Automatically load and populate on edit page load
loadCategoryForEdit();

// Also directly bind to form if present in DOM
const catForm = document.getElementById('category-form');
if (catForm) {
  catForm.onsubmit = function(e) {
    e.preventDefault();
    if (window.saveCategory) window.saveCategory();
  };
}

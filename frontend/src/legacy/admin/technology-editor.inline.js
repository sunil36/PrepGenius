
window.loadParentCategories = async function loadParentCategories() {
  const catSelect = document.getElementById('tech-cat');
  if (!catSelect) return;

  catSelect.innerHTML = '<option value="">Loading categories...</option>';

  try {
    let response;
    try {
      response = await fetch('/api/courses/categories', {
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        throw new Error(`Proxy error: ${response.status}`);
      }
    } catch (proxyErr) {
      response = await fetch('http://127.0.0.1:8080/api/courses/categories', {
        headers: { 'Accept': 'application/json' }
      });
    }

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    const categories = Array.isArray(result) ? result : (result.data || []);

    if (!categories.length) {
      catSelect.innerHTML = '<option value="">No categories found</option>';
      return;
    }

    catSelect.innerHTML = '<option value="">Select Parent Category</option>' +
      categories.map(c => {
        const id = c.id;
        const name = c.course_name || c.name || `Category ${id}`;
        return `<option value="${id}">${name}</option>`;
      }).join('');

    if (window._selectedCategoryId) {
      catSelect.value = String(window._selectedCategoryId);
    }
  } catch (err) {
    console.error('Failed to load parent categories:', err);
    catSelect.innerHTML = '<option value="">Failed to load categories</option>';
  }
};

window.loadTechnologyForEdit = async function loadTechnologyForEdit() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) return;

  window._editingTechId = id;

  if (typeof API !== 'undefined' && API.technologies && API.technologies.list) {
    try {
      const { data: list } = await API.technologies.list();
      const tech = list ? list.find(t => String(t.id) === String(id)) : null;
      if (tech) {
        const nameEl = document.getElementById('tech-name');
        const slugEl = document.getElementById('tech-slug');
        const subTypeEl = document.getElementById('tech-sub-type');
        const descEl = document.getElementById('tech-desc');
        const levelEl = document.getElementById('tech-level');
        const iconEl = document.getElementById('tech-icon');
        const orderEl = document.getElementById('tech-order');
        const catEl = document.getElementById('tech-cat');

        if (nameEl) nameEl.value = tech.name || tech.technology_name || '';
        if (slugEl) {
          slugEl.value = tech.slug || '';
          slugEl.dataset.manual = 'true';
        }
        if (subTypeEl && tech.subscription_type) subTypeEl.value = tech.subscription_type;
        if (descEl) descEl.value = tech.description || '';
        if (levelEl) levelEl.value = tech.difficulty_level || tech.level || 'all';
        if (iconEl) iconEl.value = tech.icon || tech.icon_class || 'bi-filetype-py';
        if (orderEl) orderEl.value = tech.order ?? tech.display_order ?? 1;

        window._selectedCategoryId = tech.categoryId || tech.category_id;
        if (catEl && window._selectedCategoryId) {
          catEl.value = String(window._selectedCategoryId);
        }
      }
    } catch (e) {
      console.warn('Could not load technology for edit:', e);
    }
  }
};

window.saveTechnology = async function saveTechnology() {
  const nameInput = document.getElementById('tech-name');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) {
    if (typeof Toast !== 'undefined' && Toast.error) {
      Toast.error('Technology name is required', 'Validation Error');
    } else {
      alert('Technology name is required');
    }
    return;
  }

  const categorySelect = document.getElementById('tech-cat');
  const rawCategoryId = categorySelect ? categorySelect.value : '';
  const categoryId = parseInt(rawCategoryId, 10);
  if (!categoryId || isNaN(categoryId)) {
    if (typeof Toast !== 'undefined' && Toast.error) {
      Toast.error('Please select a valid Parent Category', 'Validation Error');
    } else {
      alert('Please select a valid Parent Category');
    }
    return;
  }

  const slugInput = document.getElementById('tech-slug');
  const slug = (slugInput?.value || '').trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const description = (document.getElementById('tech-desc')?.value || '').trim();
  const subscriptionType = document.getElementById('tech-sub-type')?.value || 'free';
  const difficultyLevel = document.getElementById('tech-level')?.value || 'all';
  const iconClass = (document.getElementById('tech-icon')?.value || '').trim() || 'bi-filetype-py';
  const displayOrder = parseInt(document.getElementById('tech-order')?.value || '1', 10);

  const payload = {
    category_id: categoryId,
    subscription_type: subscriptionType,
    technology_name: name,
    slug: slug,
    description: description,
    difficulty_level: difficultyLevel,
    icon_class: iconClass,
    display_order: isNaN(displayOrder) ? 1 : displayOrder,
    active: true
  };

  const relativeUrl = '/api/technology-stack';
  const directUrl = 'http://127.0.0.1:8080/api/technology-stack';

  try {
    let response;
    try {
      response = await fetch(relativeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok && response.status >= 500) {
        throw new Error(`Proxy status: ${response.status}`);
      }
    } catch (proxyError) {
      response = await fetch(directUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    }

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMsg = result.detail || result.message;
      if (Array.isArray(result.detail)) {
        errorMsg = result.detail.map(d => `${d.loc ? d.loc.join('.') + ': ' : ''}${d.msg}`).join('\n');
      } else if (response.status === 405) {
        errorMsg = 'Method Not Allowed (405). The backend endpoint /api/technology-stack expects POST.';
      } else if (response.status === 404) {
        errorMsg = 'Endpoint /api/technology-stack returned 404 Not Found. Please verify the route in backend.';
      } else if (!errorMsg) {
        errorMsg = `Request failed with status ${response.status}`;
      }

      if (typeof Toast !== 'undefined' && Toast.error) {
        Toast.error(errorMsg, 'Error');
      } else {
        alert(errorMsg);
      }
      return;
    }

    if (typeof API !== 'undefined' && API.technologies && API.technologies.save) {
      await API.technologies.save({
        id: result.data?.id || window._editingTechId || undefined,
        name: payload.technology_name,
        categoryId: payload.category_id,
        slug: payload.slug,
        description: payload.description,
        level: payload.difficulty_level,
        icon: payload.icon_class,
        order: payload.display_order,
        status: 'active'
      }).catch(() => {});
    }

    const successMsg = result.message || 'Technology saved successfully.';
    if (typeof Toast !== 'undefined' && Toast.success) {
      Toast.success(successMsg, 'Success');
    } else {
      alert(successMsg);
    }
    setTimeout(() => { window.location.href = './technologies.html'; }, 500);

  } catch (error) {
    console.error('Error adding technology stack:', error);
    const msg = error.message || 'Could not connect to backend /technology-stack API.';
    if (typeof Toast !== 'undefined' && Toast.error) {
      Toast.error(msg, 'Connection Error');
    } else {
      alert(msg);
    }
  }
};

// Setup slug autogeneration helper
function setupSlugAutoGenerator() {
  const nameInput = document.getElementById('tech-name');
  const slugInput = document.getElementById('tech-slug');
  if (nameInput && slugInput) {
    nameInput.addEventListener('input', () => {
      if (!slugInput.dataset.manual) {
        slugInput.value = nameInput.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      }
    });
    slugInput.addEventListener('input', () => {
      slugInput.dataset.manual = 'true';
    });
  }
}

// Auto-run on load
(async () => {
  setupSlugAutoGenerator();
  await window.loadParentCategories();
  await window.loadTechnologyForEdit();
})();



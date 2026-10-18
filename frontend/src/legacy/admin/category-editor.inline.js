
  async function saveCategory() {
    const name = document.getElementById('cat-name').value;
    if (!name.trim()) {
      Toast.error('Category name is required', 'Validation Error');
      return;
    }
    await API.categories.save({
      name,
      slug: document.getElementById('cat-slug').value || name.toLowerCase().replace(/\s+/g, '-'),
      description: document.getElementById('cat-desc').value,
      icon: document.getElementById('cat-icon').value,
      displayOrder: parseInt(document.getElementById('cat-order').value, 10),
      status: 'active'
    });
    Toast.success('Category saved successfully.', 'Success');
    setTimeout(() => { window.location.href = './categories.html'; }, 500);
  }

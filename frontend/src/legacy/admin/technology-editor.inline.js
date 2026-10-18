
  async function saveTechnology() {
    const name = document.getElementById('tech-name').value;
    if (!name.trim()) {
      Toast.error('Technology name is required', 'Validation Error');
      return;
    }
    await API.technologies.save({
      name,
      categoryId: document.getElementById('tech-cat').value,
      slug: document.getElementById('tech-slug').value || name.toLowerCase().replace(/\s+/g, '-'),
      description: document.getElementById('tech-desc').value,
      level: document.getElementById('tech-level').value,
      icon: document.getElementById('tech-icon').value,
      order: parseInt(document.getElementById('tech-order').value, 10),
      status: 'active'
    });
    Toast.success('Technology saved successfully.', 'Success');
    setTimeout(() => { window.location.href = './technologies.html'; }, 500);
  }

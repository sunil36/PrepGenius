
  async function saveTopic(status) {
    const name = document.getElementById('top-name').value;
    await API.topics.update('top-1', {
      name,
      slug: document.getElementById('top-slug').value,
      description: document.getElementById('top-desc').value,
      difficulty: document.getElementById('top-difficulty').value,
      estimatedTime: document.getElementById('top-time').value,
      status
    });
    Toast.success(`Topic "${name}" saved (${status}).`, 'Saved');
  }

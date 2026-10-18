
  function updateLivePreview() {
    document.getElementById('prev-name').innerText = document.getElementById('inp-name').value;
    document.getElementById('prev-title').innerText = document.getElementById('inp-title').value;
    document.getElementById('prev-contact').innerText = `${document.getElementById('inp-email').value} • ${document.getElementById('inp-phone').value}`;
    document.getElementById('prev-summary').innerText = document.getElementById('inp-summary').value;
    document.getElementById('prev-skills').innerText = document.getElementById('inp-skills').value;
    document.getElementById('prev-exp-company').innerText = document.getElementById('inp-exp-company').value;
    document.getElementById('prev-exp-role').innerText = document.getElementById('inp-exp-role').value;
    document.getElementById('prev-exp-points').innerText = document.getElementById('inp-exp-points').value;
  }

  async function saveResume() {
    await API.resumes.save({
      id: 'res-1',
      title: 'Senior Python Backend Engineer - Custom',
      summary: document.getElementById('inp-summary').value,
      skills: document.getElementById('inp-skills').value.split(',').map(s => s.trim())
    });
    Toast.success('Resume changes persisted successfully.', 'Saved');
  }

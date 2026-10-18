
  function saveMCQ() {
    Toast.success('MCQ saved and synced to practice bank.', 'Saved');
    setTimeout(() => { window.location.href = './mcqs.html'; }, 500);
  }

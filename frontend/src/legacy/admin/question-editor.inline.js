
  async function saveQuestion() {
    const title = document.getElementById('q-title').value;
    await API.questions.update('q-1', {
      title,
      type: document.getElementById('q-type').value,
      difficulty: document.getElementById('q-diff').value,
      shortAnswer: document.getElementById('q-short').value,
      interviewTips: document.getElementById('q-tips').value,
      commonMistakes: document.getElementById('q-pitfalls').value
    });
    Toast.success('Question updated successfully.', 'Saved');
    setTimeout(() => { window.location.href = './questions.html'; }, 500);
  }

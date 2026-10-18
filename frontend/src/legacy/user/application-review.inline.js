
  async function approveApp(cardId, company) {
    await API.applications.create({
      company,
      role: 'Backend Engineer',
      matchScore: 95,
      stage: 'Applied',
      notes: 'Application approved and submitted via Review Queue.'
    });
    document.getElementById(cardId).remove();
    Toast.success(`Application submitted to ${company} and moved to your Kanban tracker!`, 'Submission Approved');
  }

  function rejectApp(cardId) {
    document.getElementById(cardId).remove();
    Toast.info('Draft discarded.', 'Rejected');
  }

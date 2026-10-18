
  async function prepareApplication() {
    Toast.info('Auto-generating tailored cover letter and custom questions...', 'Preparing Application');
    setTimeout(() => {
      window.location.href = './application-review.html?job=job-1';
    }, 800);
  }

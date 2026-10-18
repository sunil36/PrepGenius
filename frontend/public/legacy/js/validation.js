/* ==========================================================================
   PREPPILOT FORM VALIDATION & HELPERS
   ========================================================================== */

const Validator = {
  validateForm(formElement) {
    let isValid = true;
    const requiredInputs = formElement.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      // Clear existing error styling
      input.classList.remove('border-danger');
      const existingError = input.parentElement.querySelector('.form-error-msg');
      if (existingError) existingError.remove();

      if (!input.value.trim()) {
        isValid = false;
        input.classList.add('border-danger');
        const err = document.createElement('div');
        err.className = 'form-error-msg text-xs text-danger mt-1';
        err.innerText = `${input.getAttribute('placeholder') || 'This field'} is required.`;
        input.parentElement.appendChild(err);
      }
    });

    return isValid;
  },

  attachCharCounters() {
    document.querySelectorAll('[data-max-chars]').forEach(input => {
      const max = parseInt(input.getAttribute('data-max-chars'), 10);
      const counter = document.createElement('div');
      counter.className = 'text-xs text-muted text-right mt-1';
      counter.innerText = `${input.value.length} / ${max}`;
      input.parentElement.appendChild(counter);

      input.addEventListener('input', () => {
        counter.innerText = `${input.value.length} / ${max}`;
        if (input.value.length > max) {
          counter.classList.add('text-danger');
        } else {
          counter.classList.remove('text-danger');
        }
      });
    });
  }
};

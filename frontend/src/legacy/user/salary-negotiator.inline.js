
  function calculateTotalComp() {
    const base = parseFloat(document.getElementById('neg-base').value) || 0;
    const equity = parseFloat(document.getElementById('neg-equity').value) || 0;
    const bonus = parseFloat(document.getElementById('neg-bonus').value) || 0;
    const total = base + equity + bonus;
    document.getElementById('total-comp-val').innerText = `$${total.toLocaleString()} / yr`;
  }

  function generateCounterEmail() {
    const ask = document.getElementById('neg-ask').value || '220000';
    const email = document.getElementById('counter-offer-email');
    email.value = email.value.replace(/\$\d{3},\d{3}/, `$${parseInt(ask, 10).toLocaleString()}`);
  }

  function copyEmailScript() {
    const text = document.getElementById('counter-offer-email').value;
    navigator.clipboard.writeText(text);
    Toast.success('Counter-offer script copied to clipboard.', 'Copied');
  }

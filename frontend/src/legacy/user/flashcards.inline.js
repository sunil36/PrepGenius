
  let isFlipped = false;

  function toggleCardFlip() {
    isFlipped = !isFlipped;
    const flipper = document.getElementById('card-flipper');
    if (isFlipped) {
      flipper.classList.add('flipped');
    } else {
      flipper.classList.remove('flipped');
    }
  }

  function rateCard(intervalText) {
    Toast.success(`Scheduled next review interval: ${intervalText}`, 'SRS Schedule Updated');
    const flipper = document.getElementById('card-flipper');
    flipper.classList.remove('flipped');
    isFlipped = false;
  }

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      toggleCardFlip();
    }
  });

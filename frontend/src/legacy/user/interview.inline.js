
  // Countdown timer simulation
  let seconds = 1122;
  setInterval(() => {
    seconds--;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('interview-timer').innerText = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, 1000);

  // Real-time speech analysis & filler word detector
  function analyzeSpeechMetrics(text) {
    const fillerWords = ['um', 'uh', 'like', 'basically', 'literally', 'you know', 'actually'];
    const words = text.toLowerCase().split(/\s+/).filter(Boolean);
    
    let fillerCount = 0;
    let foundFillers = [];
    words.forEach(w => {
      if (fillerWords.includes(w)) {
        fillerCount++;
        if (!foundFillers.includes(w)) foundFillers.push(w);
      }
    });

    const wpm = Math.min(170, Math.max(110, Math.round(words.length * 2.4)));
    document.getElementById('live-wpm').innerText = `${wpm} WPM (${wpm > 150 ? 'Fast' : wpm < 120 ? 'Slow' : 'Ideal'})`;
    document.getElementById('live-fillers').innerText = `${fillerCount} (${foundFillers.join(', ') || 'None'})`;
  }

  function simulateLiveVoiceInput() {
    Toast.info('Listening to microphone audio...', 'Speech Recognition Active');
    const input = document.getElementById('interview-answer-input');
    input.value += " In addition, idempotency keys ensure network retries do not execute double withdrawals.";
    analyzeSpeechMetrics(input.value);
  }

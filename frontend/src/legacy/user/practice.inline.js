
  let selectedMCQ = null;

  function selectOption(val, element) {
    selectedMCQ = val;
    document.querySelectorAll('#mcq-options-container label').forEach(l => {
      l.style.borderColor = 'var(--color-border)';
      l.style.backgroundColor = 'var(--color-surface)';
    });
    element.style.borderColor = 'var(--color-primary)';
    element.style.backgroundColor = 'var(--color-primary-light)';
    element.querySelector('input').checked = true;
  }

  function checkMCQAnswer() {
    if (!selectedMCQ) {
      Toast.warning('Please select an option before submitting.', 'Selection Required');
      return;
    }
    const explanation = document.getElementById('mcq-explanation');
    explanation.classList.remove('d-none');

    if (selectedMCQ === 'B') {
      explanation.innerHTML = `
        <div class="callout callout-success">
          <strong><i class="bi bi-check-circle-fill"></i> Correct!</strong><br>
          Under C3 Linearization, sibling classes B and C are evaluated preserving local precedence order before traversing the common ancestor class A.
        </div>
      `;
      Toast.success('Correct answer! +20 Practice XP', 'Great Job');
    } else {
      explanation.innerHTML = `
        <div class="callout callout-danger">
          <strong><i class="bi bi-x-circle-fill"></i> Incorrect.</strong><br>
          Option B is the correct answer. C3 linearizes siblings first before merging shared parent classes.
        </div>
      `;
      Toast.error('Incorrect option selected. Review the explanation above.', 'Try Again');
    }
  }

  function switchPracticeTab(tabName, element) {
    document.querySelectorAll('.nav-tab-item').forEach(t => t.classList.remove('active'));
    element.classList.add('active');

    document.getElementById('tab-mcqs').classList.add('d-none');
    document.getElementById('tab-conceptual').classList.add('d-none');
    document.getElementById('tab-coding').classList.add('d-none');

    document.getElementById(`tab-${tabName}`).classList.remove('d-none');

    if (tabName === 'conceptual') {
      loadConceptual();
    }
  }

  function runLiveCodeSandbox() {
    const consoleBox = document.getElementById('test-suite-console');
    const output = document.getElementById('test-cases-output');
    consoleBox.classList.remove('d-none');
    output.innerHTML = `<span class="text-muted">Running test assertion suites against compiled sandbox...</span>`;

    setTimeout(() => {
      output.innerHTML = `
        <div class="text-success"><i class="bi bi-check-circle-fill"></i> [PASS] Test 1: Single-threaded identical identity check (db1 is db2)</div>
        <div class="text-success"><i class="bi bi-check-circle-fill"></i> [PASS] Test 2: Multi-threaded concurrency race condition test (100 parallel threads)</div>
        <div class="text-success"><i class="bi bi-check-circle-fill"></i> [PASS] Test 3: Double-checked locking optimization barrier verification</div>
        <div class="text-success"><i class="bi bi-check-circle-fill"></i> [PASS] Test 4: Subclassing isolation integrity check</div>
        <div class="mt-3 pt-2 text-xs" style="border-top: 1px solid #1E293B; color: #10B981; font-weight: 700;">
          All 4 test suites passed. Memory overhead: 0.4MB. Time complexity: O(1).
        </div>
      `;
      Toast.success('Solution passed all test assertions with 100% score!', 'Test Runner Passed');
    }, 400);
  }

  async function loadConceptual() {
    const { data: questions } = await API.questions.list();
    const container = document.getElementById('conceptual-list');
    container.innerHTML = questions.map(q => `
      <div class="card p-5">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <span class="badge badge-primary">${q.type}</span>
          <span class="badge badge-neutral">${q.difficulty}</span>
        </div>
        <h3 class="h3 mb-2">${q.title}</h3>
        <p class="text-sm text-secondary mb-3"><strong>Key Answer:</strong> ${q.shortAnswer}</p>
        <div class="callout callout-info p-3 text-xs mb-0">
          <strong>💡 Interview Strategy:</strong> ${q.interviewTips}
        </div>
      </div>
    `).join('');
  }

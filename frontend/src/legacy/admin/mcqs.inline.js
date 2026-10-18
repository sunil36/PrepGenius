
  function loadMCQs() {
    const list = MockDB.get(MockDB.STORAGE_KEYS.MCQS);
    const tbody = document.getElementById('mcqs-table-body');
    tbody.innerHTML = list.map(m => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./mcq-editor.html?id=${m.id}" style="color: var(--color-text-primary);">${m.question}</a>
          </div>
          <div class="text-xs text-muted">Topic: ${m.techName} • ${m.options.length} options configured</div>
        </td>
        <td><span class="badge badge-success">Option ${m.correctAnswer}</span></td>
        <td><span class="badge badge-neutral">${m.difficulty}</span></td>
        <td><span class="fw-bold text-success">${m.accuracyRate}</span> <small class="text-muted">(${m.attempts} attempts)</small></td>
        <td style="text-align: right;">
          <a href="./mcq-editor.html?id=${m.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('MCQ removed.', 'Deleted')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadMCQs();

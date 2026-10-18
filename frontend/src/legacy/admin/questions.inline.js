
  async function loadQuestions() {
    const { data: questions } = await API.questions.list();
    const tbody = document.getElementById('questions-table-body');
    tbody.innerHTML = questions.map(q => `
      <tr>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./question-editor.html?id=${q.id}" style="color: var(--color-text-primary);">${q.title}</a>
          </div>
          <div class="text-xs text-muted"><span class="badge badge-primary" style="font-size: 9px;">${q.techName}</span> ${q.shortAnswer.slice(0, 70)}...</div>
        </td>
        <td><span class="badge badge-neutral">${q.type}</span></td>
        <td><span class="badge badge-neutral">${q.difficulty}</span></td>
        <td><span class="badge badge-success">${q.status}</span></td>
        <td class="text-xs text-muted">${q.updatedAt}</td>
        <td style="text-align: right;">
          <a href="./question-editor.html?id=${q.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="Toast.info('Question removed.', 'Deleted')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }
  loadQuestions();

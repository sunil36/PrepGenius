
  async function loadTopics(filters = {}) {
    const { data: topics } = await API.topics.list(filters);
    const tbody = document.getElementById('topics-table-body');
    if (topics.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center p-6">
            <div class="empty-state" style="border: none;">
              <div class="empty-state-icon"><i class="bi bi-layers"></i></div>
              <div class="empty-state-title">No Topics Found</div>
              <p class="empty-state-desc">Create your first topic to start building curriculum content.</p>
              <a href="./topic-editor.html" class="btn btn-primary btn-sm">+ Create Topic</a>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = topics.map(t => `
      <tr>
        <td><input type="checkbox" class="row-checkbox" value="${t.id}"></td>
        <td>
          <div class="fw-semibold" style="font-size: 14px;">
            <a href="./topic-editor.html?id=${t.id}" style="color: var(--color-text-primary);">${t.name}</a>
          </div>
          <div class="text-xs text-muted"><span class="badge badge-primary" style="font-size: 9px;">${t.techName}</span> ${t.slug}</div>
        </td>
        <td><span class="badge badge-neutral">${t.difficulty}</span></td>
        <td>
          <div class="d-flex gap-2">
            <span class="badge badge-neutral" title="Questions">${t.questionsCount} Qs</span>
            <span class="badge badge-neutral" title="Notes">${t.notesCount} Notes</span>
            <span class="badge badge-neutral" title="MCQs">${t.mcqsCount} MCQs</span>
            <span class="badge badge-neutral" title="Coding">${t.codingCount} Code</span>
          </div>
        </td>
        <td><span class="badge ${t.status === 'published' ? 'badge-success' : 'badge-warning'}">${t.status}</span></td>
        <td class="text-xs text-muted">${t.updatedAt}</td>
        <td style="text-align: right;">
          <a href="../user/topic.html?id=${t.id}" class="btn btn-icon-sm btn-ghost" title="Preview as User" target="_blank"><i class="bi bi-eye"></i></a>
          <a href="./topic-editor.html?id=${t.id}" class="btn btn-icon-sm btn-ghost" title="Edit"><i class="bi bi-pencil"></i></a>
          <button class="btn btn-icon-sm btn-ghost text-danger" title="Delete" onclick="deleteTopicPrompt('${t.id}', '${t.name}', ${t.questionsCount}, ${t.notesCount}, ${t.mcqsCount}, ${t.codingCount})"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `).join('');
  }

  function filterTopics() {
    const search = document.getElementById('topic-search-input').value;
    const techId = document.getElementById('tech-filter').value;
    loadTopics({ search, techId });
  }

  function toggleSelectAll(master) {
    document.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = master.checked);
  }

  function deleteTopicPrompt(id, name, qCount, notesCount, mcqCount, codeCount) {
    const totalChildCount = qCount + notesCount + mcqCount + codeCount;
    UIComponents.confirmDelete({
      title: 'Delete Topic & Dependent Content?',
      message: `Are you sure you want to permanently delete "${name}"?`,
      warningCount: totalChildCount,
      warningDetails: [
        `${qCount} Interview Questions`,
        `${notesCount} Rich Notes & Guides`,
        `${mcqCount} Multiple Choice Questions (MCQs)`,
        `${codeCount} Coding Challenges`
      ],
      onConfirm: async () => {
        await API.topics.delete(id);
        Toast.success(`Topic "${name}" deleted.`, 'Topic Removed');
        loadTopics();
      }
    });
  }

  loadTopics();

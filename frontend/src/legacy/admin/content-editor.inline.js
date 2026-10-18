
  function insertCallout() {
    const html = `<div class="callout callout-warning"><strong>⚠️ Interview Tip:</strong> Insert your key takeaway here.</div><p></p>`;
    document.execCommand('insertHTML', false, html);
  }

  function toggleEditorMode(mode) {
    document.getElementById('editor-edit-container').classList.add('d-none');
    document.getElementById('editor-preview-container').classList.add('d-none');
    document.getElementById('editor-diff-container').classList.add('d-none');

    document.getElementById('btn-mode-edit').classList.remove('active');
    document.getElementById('btn-mode-preview').classList.remove('active');
    document.getElementById('btn-mode-diff').classList.remove('active');

    if (mode === 'edit') {
      document.getElementById('editor-edit-container').classList.remove('d-none');
      document.getElementById('btn-mode-edit').classList.add('active');
    } else if (mode === 'preview') {
      document.getElementById('preview-title').innerText = document.getElementById('cnt-title').value;
      document.getElementById('preview-body').innerHTML = document.getElementById('cnt-editor-body').innerHTML;
      document.getElementById('preview-code').innerText = document.getElementById('cnt-code').value;

      document.getElementById('editor-preview-container').classList.remove('d-none');
      document.getElementById('btn-mode-preview').classList.add('active');
    } else if (mode === 'diff') {
      document.getElementById('editor-diff-container').classList.remove('d-none');
      document.getElementById('btn-mode-diff').classList.add('active');
    }
  }

  function openAIAssistantModal() {
    document.getElementById('ai-generator-modal').classList.add('show');
  }

  function generateContentViaAI() {
    UIComponents.closeModal('ai-generator-modal');
    Toast.info('AI is generating structured technical guide with code...', 'AI Generating');
    setTimeout(() => {
      document.getElementById('cnt-title').value = "FastAPI Dependency Injection & Async Session Scoping";
      document.getElementById('cnt-editor-body').innerHTML = `
        <h3>Architectural Overview of FastAPI Dependencies</h3>
        <p>FastAPI's dependency injection system allows sharing database connections, authentication providers, and rate limiters cleanly with yield-based context management.</p>
        <div class="callout callout-success">
          <strong>Key Takeaway:</strong> Using <code>async def get_db() -> AsyncGenerator</code> guarantees connections are gracefully returned to the connection pool upon response completion.
        </div>
      `;
      document.getElementById('cnt-code').value = `from fastapi import Depends, FastAPI\nfrom sqlalchemy.ext.asyncio import AsyncSession\n\nasync def get_db_session() -> AsyncGenerator[AsyncSession, None]:\n    async with async_session_factory() as session:\n        try:\n            yield session\n        finally:\n            await session.close()`;
      Toast.success('Content generated and loaded into editor fields!', 'Generation Ready');
    }, 600);
  }

  function publishContent() {
    Toast.success('Content published and propagated to Candidate Learning Paths!', 'Published Successfully');
  }

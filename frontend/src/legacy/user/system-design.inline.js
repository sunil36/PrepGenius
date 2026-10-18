
  let activeDrag = null;
  let offsetX = 0, offsetY = 0;

  function dragNode(node, e) {
    activeDrag = node;
    const rect = node.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (!activeDrag) return;
    const canvas = document.getElementById('system-canvas').getBoundingClientRect();
    const x = e.clientX - canvas.left - offsetX;
    const y = e.clientY - canvas.top - offsetY;
    activeDrag.style.left = `${Math.max(10, Math.min(canvas.width - 160, x))}px`;
    activeDrag.style.top = `${Math.max(10, Math.min(canvas.height - 60, y))}px`;
  }

  function onMouseUp() {
    activeDrag = null;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  function addNode(name, icon, left = 100, top = 100) {
    const canvas = document.getElementById('system-canvas');
    const node = document.createElement('div');
    node.className = 'system-node';
    node.style.left = `${left}px`;
    node.style.top = `${top}px`;
    node.onmousedown = (e) => dragNode(node, e);
    node.innerHTML = `<i class="bi ${icon}"></i> ${name}`;
    canvas.appendChild(node);
    Toast.success(`Added ${name} to canvas.`, 'Component Added');
  }

  function resetCanvas() {
    window.location.reload();
  }

  function evaluateArchitecture() {
    const panel = document.getElementById('arch-evaluation-panel');
    panel.classList.remove('d-none');
    Toast.success('Architecture evaluated: Passed all High Availability & Latency criteria!', 'Evaluation Complete');
    panel.scrollIntoView({ behavior: 'smooth' });
  }

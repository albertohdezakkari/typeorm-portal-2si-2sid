// Integración con el selector existente. El correo no se añade a la URL ni a los materiales.
(() => {
  const frame = document.getElementById('training-frame');
  const title = document.getElementById('training-title');
  const status = document.getElementById('training-status');
  let current = null;
  let sequence = 0;

  function readState(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch { return null; }
  }

  window.prepararTallerFichas = async (student, caseData) => {
    const request = ++sequence;
    current = null;
    frame.hidden = true;
    frame.src = 'about:blank';
    status.textContent = 'Preparando tu taller…';
    title.textContent = caseData.title;
    try {
      const identity = student.teacherDemo ? 'ejemplo-docente' : student.email.trim().toLowerCase();
      const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${identity}|${caseData.id}`));
      if (request !== sequence) return;
      const digest = [...new Uint8Array(bytes)].map(n => n.toString(16).padStart(2, '0')).join('');
      const key = `sv:taller-fichas:v1:${digest}`;
      current = {
        caseId: caseData.id,
        key,
        binding: `${digest}:${request}`,
        state: readState(key),
        tabsLayout: document.getElementById('workspace').dataset.tabsLayout,
        canPrepare: true,
        loaded: false,
        target: null,
      };
      window.prepararProyectoGuiado?.({
        caseId: caseData.id,
        storageKey: key,
        abrirTaller: target => {
          document.querySelector('#workspace > nav [data-tab="training"]').click();
          if (target) {
            current.target = target;
            if (current.loaded) frame.contentWindow.postMessage({type:'taller:go', binding:current.binding, ...target}, location.origin);
          }
        },
      });
      frame.src = 'entrenar/?v=base-arturo-1';
      // Mantener el acceso habitual. El enlace directo al taller abre la pestaña al elegir correo.
      if (location.hash === '#entrenar') document.querySelector('#workspace [data-tab="training"]').click();
    } catch {
      status.textContent = 'No se ha podido preparar el taller. Recarga la página e inténtalo de nuevo.';
    }
  };

  window.addEventListener('message', event => {
    if (event.origin !== location.origin || event.source !== frame.contentWindow || !current) return;
    const data = event.data;
    if (data?.type === 'taller:ready') {
      frame.contentWindow.postMessage({ type: 'taller:init', ...current }, location.origin);
      return;
    }
    if (data?.binding !== current.binding) return;
    if (data.type === 'taller:loaded' && data.caseId === current.caseId) {
      frame.hidden = false;
      current.loaded = true;
      if (current.target) frame.contentWindow.postMessage({type:'taller:go', binding:current.binding, ...current.target}, location.origin);
      status.textContent = 'Tu avance se guarda en este navegador, separado por correo y contexto.';
    } else if (data.type === 'taller:height' && Number.isFinite(data.height)) {
      frame.style.height = `${Math.max(420, Math.min(18000, data.height + 4))}px`;
    } else if (data.type === 'taller:progress' && data.state?.caseId === current.caseId && data.state.version === 5) {
      try {
        const serialized = JSON.stringify(data.state);
        if (serialized.length > 50000) return;
        localStorage.setItem(current.key, serialized);
        current.state = data.state;
        status.textContent = 'Avance guardado en este navegador.';
      } catch {
        status.textContent = 'Tu navegador no permite guardar el avance. Puedes continuar en esta pestaña.';
      }
    } else if (data.type === 'taller:error') {
      status.textContent = 'No se ha podido abrir el material. Recarga la página e inténtalo de nuevo.';
    } else if (data.type === 'taller:prepare' && current.canPrepare) {
      window.abrirPreparacionGuiada?.(data.track);
    }
  });
  document.getElementById('training-preparation')?.addEventListener('click', () => window.abrirPreparacionGuiada?.());
})();

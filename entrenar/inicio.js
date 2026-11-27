import { montarTaller } from './taller.js?v=dos-pestanas-arturo-1';

const status = document.getElementById('estado');
const container = document.getElementById('taller');
let binding = null;
let loading = false;
let controller = null;

window.addEventListener('message', event => {
  const data = event.data;
  if (event.origin !== location.origin || event.source !== parent || data?.binding !== binding || data.type !== 'taller:go') return;
  controller?.ir(data.track, data.index);
});

function message(type, payload = {}) {
  if (parent !== window) parent.postMessage({ type, binding, ...payload }, location.origin);
}

window.addEventListener('message', async event => {
  if (event.origin !== location.origin || event.source !== parent || event.data?.type !== 'taller:init' || loading) return;
  const init = event.data;
  if (!/^CH-(?:0[1-9]|[12]\d|3[01])$/.test(init.caseId) || typeof init.binding !== 'string' || init.binding.length > 180) return;
  loading = true;
  binding = init.binding;
  status.textContent = 'Preparando tu taller…';
  try {
    const caseUrl = new URL(`casos/${init.caseId}.json`, location.href);
    caseUrl.searchParams.set('v', 'dos-pestanas-arturo-1');
    const [dataResponse, templateResponse] = await Promise.all([
      fetch(caseUrl),
      fetch(new URL('plantilla.html?v=preparacion-1', location.href)),
    ]);
    if (!dataResponse.ok || !templateResponse.ok) throw new Error('Material no disponible');
    const data = await dataResponse.json();
    if (data.context?.id !== init.caseId || data.version !== 5) throw new Error('El contexto no coincide');
    // Arturo reúne también las pruebas reales en el mismo taller.
    if(data.projectBase){
      const response=await fetch(new URL(`../preparar/${init.caseId}.json?v=dos-pestanas-arturo-1`,location.href));
      if(!response.ok)throw new Error('No se pudieron cargar las pruebas del proyecto');
      const preparation=await response.json();
      if(preparation.caseId!==init.caseId)throw new Error('Las pruebas no corresponden al contexto');
      data.practice=preparation.tracks;
    }
    container.innerHTML = await templateResponse.text();
    container.querySelector('#pdf-taller').dataset.tabsLayout = init.tabsLayout === 'wrap' ? 'wrap' : '';
    status.hidden = true;
    controller = montarTaller(data, {
      estadoInicial: init.state,
      guardar: state => message('taller:progress', { state }),
    });
    const prepare = container.querySelector('[data-prepare-project]');
    prepare.hidden = !init.canPrepare || Boolean(data.projectBase);
    prepare.onclick = () => message('taller:prepare', {track:controller.tecnologia()});
    const resize = () => message('taller:height', { height: Math.ceil(document.body.getBoundingClientRect().height) });
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    window.addEventListener('resize', resize);
    message('taller:loaded', { caseId: data.context.id, title: data.context.title });
    resize();
  } catch {
    status.hidden = false;
    status.textContent = 'No se ha podido abrir el taller. Recarga la página del portal e inténtalo de nuevo.';
    message('taller:error');
  }
});

message('taller:ready');

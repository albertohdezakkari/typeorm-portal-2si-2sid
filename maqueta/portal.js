// Cuaderno dual por contexto. Conserva los archivos y el estado de Entrenar.
(() => {
  const workspace = document.getElementById('workspace');
  const mainNav = workspace.querySelector(':scope > nav.tabs');
  const originalButtons = [...mainNav.children];
  const pageBrand = document.querySelector('body > header strong');
  const originalBrand = pageBrand.textContent;
  const trainingHeading=document.querySelector('#panel-training h2');
  const originalTrainingHeading=trainingHeading.textContent;
  const labels = new Map(originalButtons.map(b => [b, b.textContent]));
  const legacyNames = ['animation', 'case', 'er', 'crud', 'sheets', 'queries', 'functional', 'delivery'];
  const panelSlots = new Map();
  const newNames = ['bases', 'fichas-duales', 'consultas-duales', 'pruebas-duales', 'anteriores', 'simulacion'];
  const titles = [
    ['bases', '1 · Preparar proyecto base'], ['training', '2 · Entrenar con mis fichas'],
    ['fichas-duales', '3 · Fichas para imprimir'], ['consultas-duales', '4 · Consultas de referencia'],
    ['pruebas-duales', '5 · Comprobar mi API'], ['anteriores', '6 · Entrenamientos anteriores'],
    ['simulacion', '7 · Simulación y entregas']
  ];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let mounted = false;
  let mountedContext = null;
  let revision = 0;
  let data;
  let preparation;
  let track = 'nest';
  let operation = 1;
  let activeZone = 'bases';
  let archiveChoice = 'animation';
  const panel = name => document.getElementById('panel-' + name);
  const head = (eyebrow, title, lead) => `<div class="mq-heading"><span class="mq-eyebrow">${esc(eyebrow)}</span><h2>${esc(title)}</h2><p>${esc(lead)}</p></div>`;
  const action = (to, label) => `<button type="button" class="mq-button" data-mq-go="${to}">${esc(label)} <span aria-hidden="true">↗</span></button>`;
  const techTabs = () => `<nav class="mq-tech" aria-label="Tecnología de esta referencia">${[['nest','Nest + TypeORM'],['cloud','Serverless + Toolbox']].map(([key,label]) => `<button type="button" data-mq-track="${key}" aria-pressed="${track === key}">${label}</button>`).join('')}</nav>`;
  const sourceCode = (title, code, note = '') => `<section class="mq-code"><div class="mq-code-heading"><strong>${esc(title)}</strong><button type="button" data-mq-copy>Copiar</button></div><pre tabindex="0"><code>${esc(code)}</code></pre>${note ? `<p>${esc(note)}</p>` : ''}</section>`;
  const flow = (nodes, caption = '') => `<div class="mq-flow" aria-label="${esc(caption)}">${nodes.map((n,i) => `<div class="mq-node"><span class="mq-node-number">${i+1}</span><i class="mq-glyph" aria-hidden="true">${['⌘','{ }','↳','▤'][i%4]}</i><strong>${esc(n[0])}</strong><small>${esc(n[1])}</small></div>${i<nodes.length-1?'<span class="mq-arrow" aria-hidden="true">→</span>':''}`).join('')}</div>`;

  function renderBases() {
    const pilot=Boolean(data.projectBase);
    const repo=pilot?data.projectBase.url:'https://github.com/albertohdezakkari/typeorm-base';
    panel('bases').innerHTML = head('Punto de partida · repositorios existentes', 'Dos tecnologías. Tu mismo caso.', pilot?'Prepara TypeORM siguiendo el README del repositorio. Después continúa en «2 · Entrenar con mis fichas» para trabajar tu caso.':`Elige la base que vas a preparar. Después vuelve al taller de ${data.context.title} para construir tus entidades y tus cinco casos.`) +
      `<div class="mq-repositories">
        <article class="mq-repo"><div class="mq-repo-label"><span>01 / SQL</span><b>Base Nest</b></div><div class="mq-repo-body"><i class="mq-repo-icon" aria-hidden="true">@</i><h3>Nest + TypeORM</h3><p>PostgreSQL · relaciones · Entities</p><a class="mq-repo-name" href="${repo}${pilot?'#readme':''}" target="_blank" rel="noopener">albertohdezakkari / ${pilot?'examen-typeorm-27-11-26-01':'typeorm-base'} ↗</a>
        ${flow([['backend/','Tu proyecto Nest'],['Entities',data.context.parent.entity+' · '+data.context.child.entity],[data.nestSimpleRevision?'Service':'Repository','Consulta PostgreSQL']],'Desde la base a tus entidades')}
        <ul class="mq-facts"><li><b>Carpeta de trabajo</b><code>backend/</code></li><li><b>Configuración que carga esta base</b><code>${pilot?'backend/.env + .env.example':'backend/.env.example'}</code></li><li><b>Comprobación de conexión</b><code>GET /salud</code></li></ul>
        ${pilot?'<p class="mq-note"><strong>Lee el README completo y con detenimiento antes de empezar.</strong> Sigue sus pasos en orden, sin saltarte ninguno, y comprueba que el backend arranca correctamente. Después continúa en «2 · Entrenar con mis fichas».</p>':'<a class="mq-button" href="https://albertohdezakkari.github.io/typeorm-base/preparacion.html" target="_blank" rel="noopener">Abrir la guía de esta base ↗</a>'}</div></article>
        <article class="mq-repo mq-cloud"><div class="mq-repo-label"><span>02 / NoSQL</span><b>Ejemplo funcional</b></div><div class="mq-repo-body"><i class="mq-repo-icon" aria-hidden="true">λ</i><h3>Serverless + Toolbox</h3><p>AWS · Lambda · DynamoDB</p><a class="mq-repo-name" href="https://github.com/albertohdezakkari/festival-checkin-01" target="_blank" rel="noopener">albertohdezakkari / festival-checkin-01 ↗</a>
        ${flow([['YAML','Crea recursos AWS'],['Table + Entity','Describe tus datos'],['Repository','Envía el comando']],'Desde la infraestructura a la escritura')}
        <ul class="mq-facts"><li><b>Guía de arranque</b><code>0-codespaces.md</code></li><li><b>Framework local</b><code>Serverless 3.40.0</code></li><li><b>Ejemplo que ya funciona</b><span>Festival: 3 tablas · 6 Lambdas</span></li></ul>
        <a class="mq-button" href="https://github.com/albertohdezakkari/festival-checkin-01/blob/main/0-codespaces.md" target="_blank" rel="noopener">Abrir la guía de Codespaces ↗</a></div></article>
      </div>`;
  }

  function operationNav() {
    return `<nav class="mq-cases" aria-label="Cinco casos del taller">${data.operations.map(op => `<button type="button" data-mq-case="${op.ch}" aria-pressed="${operation === op.ch}"><b>0${op.ch}</b>${esc(data.chapters[op.ch])}</button>`).join('')}</nav>`;
  }

  function renderSheets() {
    if(data.projectBase&&track==='nest'){
      const entity=data.steps.nest.find(s=>s.name==='Crear Entity Obra');
      panel('fichas-duales').innerHTML=head('Tu material de estudio','El mismo código que estás construyendo','Estudia las Entities, el módulo y las llamadas entre Service y Controller. El recorrido N:M continúa este mismo backend.')+techTabs()+`<div class="mq-split"><div>${flow([['Entities','Ayuntamiento y Obra'],['ObrasModule','Registra Entities, Service y Controller'],['Service','Repository de TypeORM inyectado'],['Controller','Recibe las peticiones HTTP']],'Los archivos del proyecto de Arturo')}${action('training','Observar y montar el código')}</div><div>${sourceCode(entity.path,entity.code)}</div></div>`;
      return;
    }
    const models = data.steps[track].filter(s => s.chapter === 0 && /Entity|Table/.test(s.name));
    const shown = models.find(s => s.name.includes(track === 'nest' ? data.context.child.entity : 'Entity')) || models[0];
    panel('fichas-duales').innerHTML = head('Fichas · lectura y papel', 'El modelo, las capas y los cinco casos', 'Compara las dos tecnologías con el mismo contexto. Conservas también las cuatro fichas TypeORM anteriores, con su impresión original.') + techTabs() +
      `<div class="mq-split"><div><div class="mq-paper-stack" aria-label="Organización propuesta del material impreso">${['01 · Relación y tablas','02 · Configuración y modelos','03 · Traza entre capas','04 · Cinco casos de uso'].map((x,i)=>`<div class="mq-paper"><b>${esc(x)}</b><span>${i===0?esc(data.context.parent.sql+' 1 → N '+data.context.child.sql):i===1?(track==='nest'?'Entities · relaciones · módulo':'YAML · Table · Entity'):i===2?(track==='nest'?data.nestSimpleRevision?'Controller → Service → Entity':'Controller → Service → Repository':'Handler → Service → Repository'):'Crear · listar · modificar · trasladar · consultar'}</span></div>`).join('')}</div><p class="mq-note">Vista previa de la organización. Este esquema no genera ni sustituye un PDF.</p>${action('sheets','Abrir fichas TypeORM originales')} ${action('training','Estudiar las dos tecnologías')}</div><div>${shown ? sourceCode(shown.path, shown.code, 'Código completo del modelo que ya estudias en Entrenar. Se muestra desde la misma fuente, sin reescribirlo.') : ''}</div></div>`;
  }

  function renderQueries() {
    const simple=track==='nest'&&data.nestSimpleRevision;
    const step = data.steps[track].find(s => s.chapter === operation && s.name === (simple?'Service':'Repository'));
    const op = data.operations.find(x => x.ch === operation);
    panel('consultas-duales').innerHTML = head('Referencia · las dos tecnologías', 'Una operación, dos formas de acceder al dato', simple?'Selecciona una operación. Todas se añaden al mismo '+data.context.child.route[0].toUpperCase()+data.context.child.route.slice(1)+'Service, que utiliza las Entities de TypeORM.':'Selecciona un caso y compara su Repository. El código procede del taller aprobado, incluidos sus imports y sus modelos.') + techTabs() + operationNav() +
      `<div class="mq-split"><div>${sourceCode(step.path,step.code)}</div><div class="mq-scene">${flow(simple?[['Petición',op.fields],['Controller',data.context.child.route[0].toUpperCase()+data.context.child.route.slice(1)+'Controller'],['Service',op.nestMethod],['Datos','Entity · TypeORM']]:[['Entrada',op.fields],['Service',op.service],['Repository',op.repo],['Datos',track === 'nest' ? 'TypeORM · PostgreSQL' : op.command]],'Camino de los parámetros')}<div class="mq-result"><span>Resultado esperado</span><p>${esc(op.result)}</p></div><p>En DynamoDB, Table describe claves e índices; Entity declara los atributos. En TypeORM, las Entities describen columnas y relaciones.</p>${action('training','Seguir la animación y montar las piezas')}</div></div>${data.projectBase?'':`<div class="mq-footlink">Conservas las consultas SQL y QueryBuilder anteriores. ${action('queries','Abrir consultas TypeORM anteriores')}</div>`}`;
  }

  function renderChecks() {
    const op = data.operations.find(x => x.ch === operation);
    const s = preparation.tracks[track].find(s => s.id === 'caso-' + operation);
    const commands = s.blocks.filter(b => b.kind === 'command' && !/reinicia|despliega|sintaxis/i.test(b.title));
    panel('pruebas-duales').innerHTML = head('Comprobación · secuencia del taller', 'Prueba los mismos cinco casos', 'Ejecuta las pruebas en orden sobre tu proyecto ya preparado. Compara las respuestas reales con el resultado esperado; esta pantalla no ejecuta peticiones.') + techTabs() + operationNav() +
      `<div class="mq-check-prereq"><strong>${track === 'nest' ? 'Nest arrancado · Terminal 2' : 'AWS desplegado · terminal del Codespace'}</strong><span>${track === 'nest' ? 'Las peticiones apuntan a http://localhost:3000.' : 'API_URL debe contener la URL real de tu HTTP API.'}</span></div><div class="mq-split"><div>${commands.map(b => sourceCode(b.title,b.code,b.explain)).join('')}</div><div class="mq-scene mq-check-scene"><span class="mq-eyebrow">Caso 0${operation}</span><h3>${esc(data.chapters[operation])}</h3><div class="mq-request"><b>${esc(op.verb)}</b><code>${esc(op.route)}</code></div>${flow([['Petición','Terminal'],[track === 'nest' ? 'Controller' : 'Handler','Recibe los datos'],['Respuesta','JSON']],'Recorrido de la prueba')}<div class="mq-result"><span>Qué debes observar</span><p>${esc(operation < 3 ? 'Conserva el ID real devuelto al crear el registro. Tras crear hay cuatro registros; al eliminar solo el de prueba vuelven a quedar las tres obras originales.' : op.result)}</p></div><p>Los números de las fichas explican la traza. El alta real devuelve su propio ID; las pruebas lo conservan en la variable del registro de prueba.</p></div></div>${data.projectBase?'':`<p class="mq-note">El comprobador anterior pertenece al entrenamiento anterior y mantiene sus rutas originales. No se reutiliza como comprobador de estos cinco casos.</p>${action('functional','Abrir comprobador anterior')}`}`;
  }

  function renderReferences() {
    if (!mounted || !data || !preparation || data.projectBase) return;
    renderSheets(); renderQueries(); renderChecks();
  }

  function renderSimulation() {
    panel('simulacion').innerHTML = head('Al terminar · siguiente actividad', 'Simulación de examen', 'Aquí se reunirán las dos entregas cuando la actividad esté preparada.') + `<div class="mq-repositories">${[['01','Nest + TypeORM','Entities · Service · Controller'],['02','Serverless + Toolbox','YAML · Table / Entity · Handler · Service · Repository']].map(([n,title,parts])=>`<article class="mq-simulation"><span class="mq-eyebrow">ENTREGA ${n}</span><h3>${title}</h3><p>${parts}</p><span class="mq-pending">Pendiente de preparar</span></article>`).join('')}</div><p class="mq-note">Vista previa del apartado. Todavía no hay enunciado de examen ni formulario nuevo de entrega.</p>`;
  }

  function restore() {
    if (!mounted) return;
    for (const b of originalButtons) { b.hidden = false; b.textContent = labels.get(b); }
    mainNav.replaceChildren(...originalButtons);
    // Restaurar solo los paneles movidos. Reinsertar Entrenar recargaría su iframe.
    for (const [name,slot] of panelSlots) slot.replaceWith(panel(name));
    panelSlots.clear();
    newNames.forEach(name => panel(name)?.remove());
    workspace.querySelector('.mq-pilot-banner')?.remove();
    pageBrand.textContent = originalBrand;
    trainingHeading.textContent=originalTrainingHeading;
    delete workspace.dataset.simpleNest;
    delete workspace.dataset.guidedCourse;
    delete workspace.dataset.cuaderno;
    mountedContext = null;
    mounted = false;
  }

  function show(name) {
    if (!mounted) return;
    if(data?.projectBase&&['fichas-duales','consultas-duales','pruebas-duales','anteriores','simulacion'].includes(name))name='training';
    const legacy = legacyNames.includes(name);
    activeZone = legacy ? 'anteriores' : name === 'preparation' ? 'bases' : name;
    const destination = legacy ? 'anteriores' : name;
    for (const p of workspace.querySelectorAll(':scope > .tab-panel')) p.classList.toggle('active', p.id === 'panel-' + destination);
    for (const b of mainNav.querySelectorAll('[role="tab"]')) b.setAttribute('aria-selected', String(b.dataset.tab === activeZone));
    if (destination === 'anteriores') {
      archiveChoice = legacy ? name : archiveChoice;
      for (const old of legacyNames) panel(old).classList.toggle('active', old === archiveChoice);
      for (const b of panel('anteriores').querySelectorAll('nav [role="tab"]')) b.setAttribute('aria-selected',String(b.dataset.tab === archiveChoice));
    }
  }

  window.activarNavegacionCuaderno = b => {
    if (!mounted || workspace.dataset.currentCase !== mountedContext || !workspace.contains(b) || b.closest('#teacher-workspace')) return false;
    show(b.dataset.tab);
    return true;
  };

  window.montarCuadernoDual = async (_student, context) => {
    const request = ++revision;
    restore();
    data = null; preparation = null;
    track = 'nest'; operation = 1; archiveChoice = 'animation';
    mountedContext = context.id;
    if(context.id==='CH-22')workspace.dataset.guidedCourse='true';
    if (!mounted) {
      mounted = true;
      workspace.dataset.cuaderno = context.id;
      pageBrand.textContent = 'Cuaderno de aula · Nest y Serverless';
      const banner = document.createElement('div');
      banner.className = 'mq-pilot-banner';
      banner.innerHTML = `<span>TU RECORRIDO · ${esc(context.id)}</span><p>${esc(context.title)} <b>·</b> Un recorrido con Nest y Serverless</p>`;
      mainNav.before(banner);
      for (const name of newNames) {
        const section = document.createElement('section'); section.id = 'panel-' + name; section.className = 'tab-panel mq-panel';
        workspace.append(section);
      }
      const archive = panel('anteriores');
      archive.innerHTML = head('Biblioteca · todo lo anterior se conserva', 'Entrenamientos anteriores', 'Abre las explicaciones, las fichas, las consultas y las pruebas del recorrido anterior. Su contenido y sus botones originales siguen disponibles.') + '<nav class="tabs mq-archive-nav" role="tablist" aria-label="Materiales anteriores"></nav>';
      for (const name of legacyNames) {
        const b = originalButtons.find(b => b.dataset.tab === name);
        archive.querySelector('nav').append(b);
        const currentPanel = panel(name);
        const slot = document.createComment('ubicacion-panel-' + name);
        currentPanel.before(slot);
        panelSlots.set(name, slot);
        archive.append(currentPanel);
      }
      const training = originalButtons.find(b => b.dataset.tab === 'training');
      // El taller y su iframe se mantienen intactos; solo cambia su posición en el índice exterior.
      const visibleTitles=context.id==='CH-22'?titles.filter(([name])=>['bases','training'].includes(name)):titles;
      const visibleButtons = visibleTitles.map(([name,label]) => {
        if (name === 'training') { training.textContent = label; return training; }
        const b = document.createElement('button'); b.type = 'button'; b.setAttribute('role','tab'); b.setAttribute('aria-selected','false'); b.dataset.tab = name; b.textContent = label;
        b.addEventListener('click', () => show(name)); return b;
      });
      const preparationButton = originalButtons.find(b => b.dataset.tab === 'preparation');
      preparationButton.hidden = true; // Puente existente desde Entrenar a la preparación guiada.
      mainNav.replaceChildren(...visibleButtons, preparationButton);
      panel('bases').innerHTML = '<p role="status">Preparando las bases de tu contexto…</p>';
      if(context.id!=='CH-22')renderSimulation();
      for (const name of ['fichas-duales','consultas-duales','pruebas-duales']) panel(name).innerHTML = '<p role="status">Cargando las referencias del taller…</p>';
    }
    show(context.id==='CH-22'?'bases':location.hash === '#entrenar' ? 'training' : 'bases');
    if(context.id==='CH-22'){
      history.replaceState(null,'','#1n');
      mainNav.querySelector('[data-tab="bases"]').focus({preventScroll:true});
    }
    try {
      const results = await Promise.all([`entrenar/casos/${encodeURIComponent(context.id)}.json?v=guiado-arturo-1`, `preparar/${encodeURIComponent(context.id)}.json?v=guiado-arturo-1`].map(async url => {
        const response = await fetch(url); if (!response.ok) throw new Error('No se pudo abrir ' + url); return response.json();
      }));
      if (request !== revision || !mounted) return;
      [data,preparation] = results;
      if(data.nestSimpleRevision){workspace.dataset.simpleNest='true';trainingHeading.textContent='Entrenar con mis fichas';}
      renderBases();
      renderReferences();
    } catch {
      if (request !== revision || !mounted) return;
      for (const name of ['bases','fichas-duales','consultas-duales','pruebas-duales']) panel(name).innerHTML = '<p role="alert">No se pudieron cargar las referencias. Puedes continuar en Entrenar con mis fichas y volver a intentarlo al recargar.</p>';
    }
  };

  document.getElementById('back').addEventListener('click', restore);

  workspace.addEventListener('click', async event => {
    if (!mounted) return;
    const go = event.target.closest('[data-mq-go]');
    if (go) { show(go.dataset.mqGo); return; }
    const tech = event.target.closest('[data-mq-track]');
    const choose = event.target.closest('[data-mq-case]');
    if (tech || choose) {
      const key = tech ? 'mqTrack' : 'mqCase';
      const value = (tech || choose).dataset[key];
      const name = activeZone;
      if (tech) track = value; else operation = Number(value);
      const beforeY = window.scrollY;
      renderReferences();
      const attr = tech ? 'data-mq-track' : 'data-mq-case';
      panel(name).querySelector(`[${attr}="${value}"]`)?.focus({preventScroll:true});
      window.scrollTo({top:beforeY,behavior:'instant'});
      return;
    }
    const copy = event.target.closest('[data-mq-copy]');
    if (copy) {
      try { await navigator.clipboard.writeText(copy.closest('.mq-code').querySelector('code').textContent); copy.textContent = 'Copiado'; }
      catch { copy.textContent = 'Selecciona el código para copiar'; }
    }
  });
})();

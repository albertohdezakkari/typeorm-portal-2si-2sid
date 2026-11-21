// Preparación por contexto, separada de los aciertos del taller aprobado.
(() => {
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let generation = 0;
  let active = null;
  let release = () => {};

  window.prepararProyectoGuiado = async ({caseId, storageKey, abrirTaller}) => {
    const request = ++generation;
    release();
    release = () => {};
    active = null;
    const header = document.querySelector('#panel-preparation > h2');
    const intro = document.querySelector('#panel-preparation > p');
    const entry = document.getElementById('training-preparation');
    if (entry) entry.hidden = false;
    const host = document.getElementById('project-preparation');
    header.hidden = true;
    intro.hidden = true;
    host.innerHTML = '<p role="status">Preparando tu recorrido de arranque…</p>';
    header.textContent = '01 · Prepara y ejecuta tu proyecto';
    intro.textContent = 'Prepara el entorno, estudia tu modelo y aplica los casos sobre tu propia copia.';
    try {
      const response = await fetch(`preparar/${encodeURIComponent(caseId)}.json?v=aula-2`);
      if (!response.ok) throw new Error('No se ha cargado el recorrido');
      const data = await response.json();
      if (request !== generation) return;
      const context = data.context;
      const parent = context.parent;
      const child = context.child;
      const modelFields = data.fieldGuide.entities;
      const key = storageKey.replace('sv:taller-fichas:', 'sv:preparacion:');
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem(key) || '{}'); } catch { /* Sin estado anterior. */ }
      const state = {
        track: saved.track === 'cloud' ? 'cloud' : 'nest',
        positions: {nest: 0, cloud: 0, ...saved.positions},
        block: 0, page: 0, full: false, focus: 0,
        profile: ['default','academy'].includes(saved.profile) ? saved.profile : 'default',
        team: /^[a-z][a-z0-9-]{0,19}$/.test(saved.team || '') ? saved.team : 'equipo01',
        done: Array.isArray(saved.done) ? saved.done.filter(x => typeof x === 'string') : []
      };
      for (const tech of ['nest','cloud']) {
        if (!Number.isInteger(state.positions[tech]) || !data.tracks[tech][state.positions[tech]]) state.positions[tech] = 0;
      }
      let announcement = '';
      let menuCollapsed = false;
      let scrollFrame = 0;
      let previousScroll = Math.max(0, window.scrollY);
      let scrollDirection = 0;
      let scrollDistance = 0;
      const steps = () => data.tracks[state.track];
      const step = () => steps()[state.positions[state.track]];
      const block = () => step().blocks[state.block];
      const token = () => state.track + ':' + step().id;
      const phase = () => step().id === 'guardar' ? 3 : step().id.startsWith('caso-') ? 2 : ['modelos','datos'].includes(step().id) ? 1 : 0;
      const text = value => String(value || '').replaceAll('{{PROFILE}}', state.profile).replaceAll('{{TEAM}}', state.team);
      const save = () => {
        try { localStorage.setItem(key, JSON.stringify({version: 1, caseId, track: state.track, positions: state.positions, profile: state.profile, team: state.team, done: state.done})); }
        catch { announcement = 'Puedes continuar; este navegador no permite guardar el avance.'; }
      };
      function nodeMeaning() {
        const cloud = state.track === 'cloud';
        const meanings = {
          process: ['La terminal mantiene el proceso Nest abierto.', 'main.ts crea la aplicación y escucha en el puerto de .env.', 'AppModule reúne los elementos que Nest debe cargar.', 'curl entra en /salud y recibe la respuesta del controller.'],
          workspace: ['Aquí ejecutas Git y preparas tu copia.', 'origin debe apuntar al repositorio de tu cuenta.', 'Cada base tiene sus dependencias y su archivo de arranque.', 'Aquí construyes tu código; el ejemplo Festival de la raíz conserva su configuración.'],
          credentials: ['Academy proporciona tres credenciales temporales al iniciar el laboratorio.', 'El archivo queda en tu carpeta personal, fuera del repositorio.', 'AWS_PROFILE elige una sección de ese archivo.', 'STS comprueba la identidad de esa sesión; todavía no crea recursos.'],
          role: ['Tu perfil autoriza los comandos que ejecutas en la terminal.', 'Serverless usa ese perfil para desplegar lo que describe el YAML.', 'LabRole ya existe en el laboratorio y tiene los permisos autorizados.', 'La función utiliza LabRole cuando se ejecuta. No hereda tus claves de terminal.'],
          model: cloud ? ['El YAML crea las tablas y Ref entrega sus nombres a Lambda.', 'db es el cliente que enviará las operaciones a DynamoDB.', 'Table describe el nombre real, las claves y el índice que ya creó el YAML.', 'Entity declara los campos y traduce sus etiquetas con savedAs.']
            : ['forRoot conecta PostgreSQL; AppModule también importa TallerModule.', 'forFeature registra las dos Entities en TallerModule.', `${parent.entity} tiene su PK y una colección inversa de ${child.route}.`, `${child.entity} guarda su PK, sus datos y la FK hacia ${parent.entity}.`],
          records: [`El ID 1 identifica ${parent.examples[0]}.`, `Los registros 7 y 9 de ${child.entity} guardan la referencia al ID 1.`, `El ID 2 identifica ${parent.examples[1]}.`, `El registro 8 de ${child.entity} guarda la referencia al ID 2.`],
          trace: ['La llamada transporta los datos de la operación.', cloud ? 'El handler recibe body, pathParameters o queryStringParameters.' : 'El controller recibe body, parámetros de ruta o filtros de consulta.', 'El service organiza el caso y llama al repository.', cloud ? 'El repository usa el modelo y envía el comando de Toolbox.' : 'El repository usa la Entity y ejecuta la lectura o escritura SQL.']
        };
        return (meanings[step().scene] || [step().lead, block().explain, step().lead, step().expect])[state.focus];
      }
      const icon = type => {
        if (type === 'db') return '<i class="pg-cylinder" aria-hidden="true"><i></i></i>';
        if (type === 'folder') return '<i class="pg-folder" aria-hidden="true"></i>';
        if (type === 'key') return '<i class="pg-key" aria-hidden="true"></i>';
        return `<span class="pg-code-icon" aria-hidden="true">${esc(type === 'lambda' ? 'λ' : type === 'env' ? '$' : type === 'entity' ? '@' : '{ }')}</span>`;
      };
      function diagram() {
        const s = step();
        const types = s.scene === 'process' ? ['code','code','code','code']
          : s.scene === 'credentials' ? ['folder','key','env','code']
          : s.scene === 'database' ? ['code','db','key','db']
          : s.scene === 'workspace' ? ['code','folder','folder','folder']
          : s.scene === 'model' ? ['code','code','db','entity']
          : s.scene === 'records' ? ['db','entity','db','entity']
          : ['code', state.track === 'cloud' ? 'lambda' : 'code', 'code','db'];
        const titles = s.nodes;
        const model = s.scene === 'model' || s.scene === 'records';
        return `<div class="pg-canvas" data-scene="${esc(s.scene)}">
          <div class="pg-canvas-top"><span>${state.track === 'cloud' ? 'AWS · SERVERLESS' : 'TU ORDENADOR · NEST'}</span><span class="pg-context">${esc(caseId)}</span></div>
          <div class="pg-flow-board">
            <svg class="pg-wires" viewBox="0 0 600 300" preserveAspectRatio="none" aria-hidden="true"><path d="M145 70 H455 V230 H145 V70"/><path class="pg-signal" d="M145 70 H455 V230 H145 V70"/></svg>
            ${titles.map((title,i) => `<button type="button" class="pg-node" data-node="${i}" data-active="${state.focus === i}" aria-pressed="${state.focus === i}">${icon(types[i])}<span class="pg-node-index">${i+1}</span><strong>${esc(title)}</strong></button>`).join('')}
          </div>
          ${model ? `<div class="pg-model-cards">${modelFields.map((entity, i) => `${i ? '<span class="pg-relation">1<span></span>0..N</span>' : ''}<section><strong>${esc(state.track === 'cloud' ? entity.dynamo : entity.sql)}</strong>${entity.fields.map(field => `<div><${field.role === 'data' ? 'span' : 'b'}>${field.role === 'key' ? 'PK' : field.role === 'reference' ? (state.track === 'cloud' ? 'REF' : 'FK') : 'DATO'}</${field.role === 'data' ? 'span' : 'b'}><code>${esc(field[state.track].column)}</code></div>`).join('')}</section>`).join('')}</div>` : ''}
          <div class="pg-diagram-note"><span class="pg-beacon" aria-hidden="true"></span><strong>${esc(titles[state.focus])}</strong><span>Elemento ${state.focus+1} de ${titles.length}</span><p>${esc(nodeMeaning())}</p></div>
        </div>`;
      }
      function codeView(b) {
        const code = text(b.code);
        const lines = code.split('\n');
        const pages = Math.max(1, Math.ceil(lines.length / 14));
        state.page = Math.min(state.page, pages-1);
        const start = b.kind === 'file' && !state.full ? state.page*14 : 0;
        const end = b.kind === 'file' && !state.full ? Math.min(lines.length, start+14) : lines.length;
        return `<div class="pg-code-top"><strong>${esc(b.title)}</strong><div><button type="button" data-action="copy" data-copy="code">Copiar ${b.kind === 'file' ? 'archivo completo' : 'comando'}</button>${b.kind === 'file' ? '<button type="button" data-action="full">'+(state.full ? 'Ver por páginas' : 'Ver archivo entero')+'</button>' : ''}</div></div>
          <pre class="pg-source ${b.kind === 'file' ? '' : 'pg-command'}" tabindex="0" aria-label="${esc(b.title)}"><code>${lines.slice(start,end).map((line,i) => `<span class="pg-line" data-line="${start+i+1}">${esc(line) || ' '}</span>`).join('\n')}</code></pre>
          ${b.kind === 'file' ? `<div class="pg-pages"><button type="button" data-action="prev-page" ${state.full || state.page === 0 ? 'disabled' : ''}>Página anterior</button><span>${state.full ? `Archivo entero · ${lines.length} líneas` : `Página ${state.page+1} de ${pages} · líneas ${start+1}–${end}`}</span><button type="button" data-action="next-page" ${state.full || state.page === pages-1 ? 'disabled' : ''}>Página siguiente</button></div>` : ''}`;
      }
      function render() {
        const s = step();
        const b = block();
        const before = document.activeElement;
        const focusKeys = ['action','node','copy','block','step','track','phase','term','config'];
        const focused = before && host.contains(before) ? focusKeys.filter(key => before.dataset[key] !== undefined).map(key => `[data-${key}="${CSS.escape(before.dataset[key])}"]`).join('') : '';
        const scroll = {x:window.scrollX, y:window.scrollY};
        const markup = `<div class="pg-preparation" data-preparation-context="${esc(caseId)}">
          <div class="pg-sticky-menu" data-menu-track="${state.track}">
          <div class="pg-menu-content" id="pg-navigation-controls">
          <header class="pg-header"><div><span class="pg-eyebrow">TU PROYECTO · ${esc(context.title.toUpperCase())}</span><h3>Del cuaderno al proyecto que funciona</h3></div><div class="pg-tech" aria-label="Tecnología de preparación">${[['nest','Nest + TypeORM'],['cloud','Serverless + Toolbox']].map(([tech,label]) => `<button type="button" data-action="track" data-track="${tech}" aria-pressed="${state.track === tech}">${label}</button>`).join('')}</div></header>
          <nav class="pg-journey" aria-label="Orden de trabajo">${['Preparar el entorno','Entender el modelo','Construir los casos','Comprobar los datos'].map((label,i)=>`<button type="button" data-action="phase" data-phase="${i}" data-current="${phase()===i}" aria-pressed="${phase()===i}">${i+1} · ${label}</button>`).join('')}</nav>
          <nav class="pg-steps" aria-label="Pasos de preparación">${steps().map((x,i) => `<button type="button" data-action="step" data-step="${i}" ${i === state.positions[state.track] ? 'aria-current="step"' : ''}><span>${String(i+1).padStart(2,'0')}</span>${esc(x.title)}${state.done.includes(state.track+':'+x.id) ? '<b aria-label="Resultado comprobado">✓</b>' : ''}</button>`).join('')}</nav>
          </div>
          <div class="pg-menu-summary" hidden><button type="button" data-action="expand-menu" aria-controls="pg-navigation-controls" aria-expanded="false"><strong data-summary-count>Paso ${state.positions[state.track]+1} de ${steps().length}</strong><span data-summary-title>${esc(s.title)}</span><span class="pg-expand-label">Mostrar menú <span aria-hidden="true">⌄</span></span></button></div>
          </div>
          <div class="pg-compact-status" hidden><strong>Paso ${state.positions[state.track]+1} de ${steps().length}</strong><span>${esc(s.title)}</span></div>
          <div class="pg-config-slot">${state.track === 'cloud' ? `<div class="pg-settings"><label>Perfil AWS<select data-config="profile"><option ${state.profile === 'default' ? 'selected' : ''}>default</option><option ${state.profile === 'academy' ? 'selected' : ''}>academy</option></select></label><label>Tu equipo<input data-config="team" type="text" value="${esc(state.team)}" pattern="[a-z][a-z0-9-]{0,19}" maxlength="20" spellcheck="false"></label><p>Región: <b>us-east-1</b>. Estos valores actualizan los comandos; expórtalos en tu terminal. Las credenciales se pegan únicamente en tu Codespace.</p></div>` : ''}</div>
          <div class="pg-step-content">
          <div class="pg-step-heading"><div><p class="pg-eyebrow">PASO ${state.positions[state.track]+1} DE ${steps().length}</p><h3>${esc(s.title)}</h3><p>${esc(s.lead)}</p></div><button type="button" class="pg-return" data-action="resume">Volver a mi taller</button></div>
          <div class="pg-location"><span aria-hidden="true">⌁</span><strong>Dónde trabajas</strong><span>${esc(s.where)}</span></div>
          <div class="pg-layout"><section class="pg-work" aria-label="Qué haces en tu proyecto"><nav class="pg-files" aria-label="Acciones y archivos del paso">${s.blocks.map((x,i) => `<button type="button" data-action="block" data-block="${i}" aria-pressed="${state.block === i}"><span>${i+1}</span>${esc(x.title)}</button>`).join('')}</nav>
            ${b.kind === 'file' ? `<div class="pg-create"><div><b>Primero crea y abre el archivo</b><button type="button" data-action="copy" data-copy="create">Copiar creación</button></div><pre><code>${esc(b.create)}</code></pre><p>Si <code>code</code> no existe, abre el archivo desde el Explorer de VS Code. Después pega el contenido completo y guarda.</p></div>` : ''}
            ${codeView(b)}
            ${b.explain ? `<div class="pg-explanation"><b>Por qué lo haces</b><p>${esc(b.explain)}</p></div>` : ''}
            ${b.links?.length ? `<div class="pg-reference-links">${b.links.map(([label,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}</a>`).join('')}</div>` : ''}
          </section><aside class="pg-understand" aria-label="Qué ocurre con lo que escribes">${diagram()}
            <div class="pg-understand-title"><b>Relaciona el comando con el dibujo</b><button type="button" data-action="next-node">Seguir el dibujo · ${state.focus+1}/${s.nodes.length}</button></div>
            ${b.terms?.length ? `<div class="pg-terms">${b.terms.map(([term,meaning],i) => `<button type="button" data-action="term" data-term="${i}" title="Resaltar esta parte en el código"><code>${esc(text(term))}</code><span>${esc(meaning)}</span></button>`).join('')}</div>` : '<p class="pg-reading-tip">Pulsa los elementos del dibujo para seguir su orden. El código completo y su comprobación están a la izquierda y debajo.</p>'}
          </aside></div>
          <section class="pg-checkpoint"><div><span class="pg-check-icon" aria-hidden="true">✓</span><div><h4>Antes de avanzar</h4><p>${esc(s.expect)}</p></div></div><label><input type="checkbox" data-action="checked" ${state.done.includes(token()) ? 'checked' : ''}>He realizado esta comprobación en mi proyecto</label><p class="pg-local-note">Esta marca es tu recordatorio. El cuaderno no ejecuta los comandos ni comprueba tu servidor.</p></section>
          <footer class="pg-bottom"><button type="button" data-action="previous" ${state.positions[state.track] === 0 ? 'disabled' : ''}>Paso anterior</button>${s.workshop ? `<button type="button" class="pg-primary" data-action="study">Estudiar este código en Entrenar</button>` : ''}<button type="button" class="pg-primary" data-action="next" ${state.positions[state.track] === steps().length-1 ? 'disabled' : ''}>Siguiente paso</button></footer><p class="pg-announcement" role="status" aria-live="polite">${esc(announcement || `Paso ${state.positions[state.track]+1} de ${steps().length}. ${state.done.filter(x => x.startsWith(state.track+':')).length} resultados marcados por ti. Tu avance se conserva en este navegador.`)}</p>
          </div>
        </div>`;
        const current = host.querySelector('.pg-preparation');
        if (!current) host.innerHTML = markup;
        else {
          const template = document.createElement('template');
          template.innerHTML = markup;
          const next = template.content.querySelector('.pg-preparation');
          const menu = current.querySelector('.pg-sticky-menu');
          const updatedMenu = next.querySelector('.pg-sticky-menu');
          // Conservar los controles que el alumno está usando, especialmente el foco.
          if (menu.dataset.menuTrack !== state.track) {
            menu.querySelector('.pg-steps').innerHTML = updatedMenu.querySelector('.pg-steps').innerHTML;
            current.querySelector('.pg-config-slot').innerHTML = next.querySelector('.pg-config-slot').innerHTML;
          }
          menu.dataset.menuTrack = state.track;
          menu.querySelector('[data-summary-count]').textContent = `Paso ${state.positions[state.track]+1} de ${steps().length}`;
          menu.querySelector('[data-summary-title]').textContent = s.title;
          for (const button of menu.querySelectorAll('[data-action]')) {
            const type = button.dataset.action;
            const key = type === 'track' ? 'track' : type === 'phase' ? 'phase' : 'step';
            const fresh = updatedMenu.querySelector(`[data-action="${type}"][data-${key}="${button.dataset[key]}"]`);
            if (!fresh) continue;
            for (const attr of ['aria-current','aria-pressed','data-current']) {
              if (fresh.hasAttribute(attr)) button.setAttribute(attr,fresh.getAttribute(attr));
              else button.removeAttribute(attr);
            }
            if (type === 'step' && button.innerHTML !== fresh.innerHTML) button.innerHTML = fresh.innerHTML;
          }
          current.querySelector('.pg-compact-status').innerHTML = next.querySelector('.pg-compact-status').innerHTML;
          current.querySelector('.pg-step-content').innerHTML = next.querySelector('.pg-step-content').innerHTML;
        }
        syncPinnedMenu();
        if (focused && !before.isConnected) {
          const target = host.querySelector(focused);
          if (target && !target.disabled) target.focus({preventScroll:true});
        }
        if (window.scrollX !== scroll.x || window.scrollY !== scroll.y) window.scrollTo({left:scroll.x,top:scroll.y,behavior:'instant'});
      }
      function syncPinnedMenu() {
        const menu = host.querySelector('.pg-sticky-menu');
        if (!menu) return;
        const fits = menu.getBoundingClientRect().height <= Math.max(120, window.innerHeight - 160);
        menu.dataset.pinned = String(fits);
        host.querySelector('.pg-compact-status').hidden = fits;
        if (!fits) menuCollapsed = false;
        applyMenuVisibility();
      }
      function applyMenuVisibility() {
        const menu = host.querySelector('.pg-sticky-menu');
        if (!menu) return;
        const collapsed = menuCollapsed && menu.dataset.pinned === 'true';
        menu.dataset.collapsed = String(collapsed);
        const controls = menu.querySelector('.pg-menu-content');
        controls.inert = collapsed;
        controls.setAttribute('aria-hidden', String(collapsed));
        const summary = menu.querySelector('.pg-menu-summary');
        summary.hidden = !collapsed;
        summary.querySelector('button').setAttribute('aria-expanded', String(!collapsed));
        const height = menu.dataset.pinned === 'true' ? (collapsed ? summary.offsetHeight : menu.offsetHeight) : host.querySelector('.pg-compact-status').offsetHeight;
        host.querySelector('.pg-preparation').style.setProperty('--pg-menu-height', `${height}px`);
      }
      function resetScrollDirection() {
        previousScroll = Math.max(0, window.scrollY);
        scrollDirection = 0;
        scrollDistance = 0;
      }
      function setMenuCollapsed(value) {
        if (menuCollapsed === value) return;
        menuCollapsed = value;
        applyMenuVisibility();
      }
      function followScrollDirection() {
        scrollFrame = 0;
        const menu = host.querySelector('.pg-sticky-menu');
        if (!menu || !menu.getClientRects().length) { resetScrollDirection(); return; }
        const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
        const delta = y - previousScroll;
        previousScroll = y;
        if (menu.dataset.pinned !== 'true' || menu.getBoundingClientRect().top > 1) {
          setMenuCollapsed(false); scrollDirection = 0; scrollDistance = 0; return;
        }
        if (Math.abs(delta) < .5) return;
        const direction = Math.sign(delta);
        if (direction !== scrollDirection) scrollDistance = 0;
        scrollDirection = direction;
        scrollDistance += Math.abs(delta);
        // Un margen corto evita abrir/cerrar con el temblor del trackpad.
        if (scrollDistance < 12) return;
        const controls = menu.querySelector('.pg-menu-content');
        const keyboardInMenu = controls.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
        if (direction < 0 || keyboardInMenu) setMenuCollapsed(false);
        else setMenuCollapsed(true);
      }
      function onWindowScroll() {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(followScrollDirection);
      }
      function onMenuFocus(event) {
        if (event.target.closest('.pg-menu-content')) {
          setMenuCollapsed(false);
          resetScrollDirection();
        }
      }
      function go(index) {
        state.positions[state.track] = Math.max(0, Math.min(steps().length-1, index));
        state.block = 0; state.page = 0; state.focus = 0; state.full = false; announcement = '';
        save(); render();
      }
      function focusFor(b) {
        if (step().scene === 'model') {
          if (state.track === 'nest') {
            if (b.path?.includes('app.module')) return 0;
            if (b.path?.includes('taller.module')) return 1;
            if (b.path === parent.file) return 2;
            if (b.path === child.file) return 3;
          } else {
            if (b.path === 'serverless.yml') return 0;
            if (b.path?.includes('dynamo.mjs')) return 1;
            if (b.path?.includes('.model.mjs')) return 2;
          }
        }
        if (step().scene === 'trace') {
          if (b.path?.includes('controller.') || b.path?.includes('handler.')) return 1;
          if (b.path?.includes('service.')) return 2;
          if (b.path?.includes('repository.')) return 3;
          return 0;
        }
        return 0;
      }
      function selectNode(index) {
        state.focus=index;
        let path=null;
        if (step().scene==='model') {
          path=state.track==='cloud' ? ['serverless.yml','src/datos/dynamo.mjs',context.modelFile,context.modelFile][index]
            : ['src/app.module.ts','src/taller.module.ts',parent.file,child.file][index];
        }
        let found=path ? step().blocks.findIndex(b=>b.path===path) : -1;
        if (step().scene==='trace') {
          const main=step().blocks.find(b=>/\/(handler|controller)\./.test(b.path||''));
          const prefix=main?.path.slice(0,main.path.lastIndexOf('/')+1);
          const kind=['','handler|controller','service','repository'][index];
          found=index===0 ? step().blocks.findIndex(b=>b.code.includes('curl '))
            : step().blocks.findIndex(b=>b.path?.startsWith(prefix) && new RegExp('/('+kind+')\\.').test(b.path));
        }
        if (found>=0) {state.block=found;state.page=0;state.full=false;}
        if (step().scene==='model' && state.track==='cloud' && index===3) {
          const line=block().code.split('\n').findIndex(line=>line.includes('export const '+child.model));
          if(line>=0)state.page=Math.floor(line/14);
        }
        render();
      }
      host.onclick = async event => {
        const button = event.target.closest('[data-action],[data-node]');
        if (!button || !host.contains(button)) return;
        const action = button.dataset.action;
        if (action === 'expand-menu') {
          setMenuCollapsed(false);
          resetScrollDirection();
          host.querySelector('.pg-steps [aria-current="step"]').focus({preventScroll:true});
          return;
        }
        if (button.dataset.node !== undefined) { selectNode(+button.dataset.node); return; }
        if (action === 'track') { state.track = button.dataset.track; state.block=0; state.page=0; state.full=false; state.focus=0; save(); render(); }
        if (action === 'step') go(+button.dataset.step);
        if (action === 'block') { state.block=+button.dataset.block; state.page=0; state.full=false; state.focus=focusFor(block()); render(); }
        if (action === 'phase') {
          const id=['repositorio','modelos','caso-1','guardar'][+button.dataset.phase];
          go(steps().findIndex(s=>s.id===id));
        }
        if (action === 'previous') go(state.positions[state.track]-1);
        if (action === 'next') go(state.positions[state.track]+1);
        if (action === 'full') { state.full=!state.full; render(); }
        if (action === 'prev-page') { state.page--; render(); }
        if (action === 'next-page') { state.page++; render(); }
        if (action === 'next-node') selectNode((state.focus+1)%step().nodes.length);
        if (action === 'checked') {
          state.done=state.done.filter(x=>x!==token()); if (button.checked) state.done.push(token()); save(); render();
        }
        if (action === 'copy') {
          try { await navigator.clipboard.writeText(text(button.dataset.copy === 'create' ? block().create : block().code)); announcement='Contenido copiado. Pégalo en '+(button.dataset.copy === 'create' ? 'la terminal.' : block().kind === 'file' ? block().path+'.' : 'la terminal indicada.'); }
          catch { announcement='Selecciona el contenido y cópialo con Ctrl+C o Cmd+C.'; }
          host.querySelector('.pg-announcement').textContent=announcement;
        }
        if (action === 'study') abrirTaller(step().workshop);
        if (action === 'resume') abrirTaller();
        if (action === 'term') {
          const [term] = block().terms[+button.dataset.term];
          const lines=text(block().code).split('\n'); const number=lines.findIndex(line=>line.includes(text(term)));
          if (number >= 0) {
            state.page=Math.floor(number/14); render();
            const line=host.querySelector(`.pg-line[data-line="${number+1}"]`);
            if (line) {
              line.dataset.highlight='true';
              const source=line.closest('.pg-source'), r=line.getBoundingClientRect(), box=source.getBoundingClientRect();
              if (r.top < box.top || r.bottom > box.bottom) source.scrollTop += r.top - box.top;
            }
          }
        }
      };
      host.onchange = event => {
        if (event.target.matches('[data-config=profile]')) state.profile=event.target.value;
        if (event.target.matches('[data-config=team]')) {
          if (!event.target.checkValidity()) { event.target.reportValidity(); return; }
          state.team=event.target.value;
        }
        save(); render();
      };
      active = {
        open: track => {
          setMenuCollapsed(false);
          resetScrollDirection();
          if (track && ['nest','cloud'].includes(track) && state.track!==track) { state.track=track; state.block=0; state.page=0; state.full=false; save(); render(); }
          document.querySelector('#workspace > nav [data-tab=preparation]').click();
        }
      };
      render();
      const observer = new ResizeObserver(syncPinnedMenu);
      observer.observe(host.querySelector('.pg-sticky-menu'));
      window.addEventListener('resize',syncPinnedMenu);
      window.addEventListener('scroll',onWindowScroll,{passive:true});
      host.addEventListener('focusin',onMenuFocus);
      resetScrollDirection();
      release = () => {
        observer.disconnect(); cancelAnimationFrame(scrollFrame);
        window.removeEventListener('resize',syncPinnedMenu);
        window.removeEventListener('scroll',onWindowScroll);
        host.removeEventListener('focusin',onMenuFocus);
      };
    } catch {
      if (request !== generation) return;
      host.innerHTML = '<p role="status">No se ha podido cargar la preparación. Recarga el cuaderno y vuelve a seleccionar tu correo.</p>';
    }
  };
  window.abrirPreparacionGuiada = track => active?.open(track);
})();

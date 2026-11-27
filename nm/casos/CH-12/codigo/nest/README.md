# CH-12 · Lote ↔ Inspector

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Lote, Inspector y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /inspectores y GET /inspectores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees InspectoresModule, InspectoresService ni InspectoresController. La Entity
Inspector sigue en src/inspectores/entities/inspector.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

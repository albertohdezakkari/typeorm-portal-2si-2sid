# CH-18 · Actividad ↔ Monitor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Actividad, Monitor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /monitores y GET /monitores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees MonitoresModule, MonitoresService ni MonitoresController. La Entity
Monitor sigue en src/monitores/entities/monitor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

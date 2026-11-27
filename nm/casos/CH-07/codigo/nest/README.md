# CH-07 · Excursion ↔ Guia

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Excursion, Guia y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /guias y GET /guias. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees GuiasModule, GuiasService ni GuiasController. La Entity
Guia sigue en src/guias/entities/guia.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

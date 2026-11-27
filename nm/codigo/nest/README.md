# CH-22 · Obra ↔ Profesional

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Obra, Profesional y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /profesionales y GET /profesionales. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees ProfesionalesModule, ProfesionalesService ni ProfesionalesController. La Entity
Profesional sigue en src/profesionales/entities/profesional.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

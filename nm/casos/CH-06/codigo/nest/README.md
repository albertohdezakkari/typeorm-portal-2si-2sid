# CH-06 · Sesion ↔ Instructor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Sesion, Instructor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /instructores y GET /instructores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees InstructoresModule, InstructoresService ni InstructoresController. La Entity
Instructor sigue en src/instructores/entities/instructor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

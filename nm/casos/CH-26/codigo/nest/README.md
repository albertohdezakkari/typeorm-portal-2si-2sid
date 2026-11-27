# CH-26 · Aula ↔ Docente

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Aula, Docente y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /docentes y GET /docentes. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees DocentesModule, DocentesService ni DocentesController. La Entity
Docente sigue en src/docentes/entities/docente.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

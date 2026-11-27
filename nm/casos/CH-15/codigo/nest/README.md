# CH-15 · Proyecto ↔ Colaborador

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Proyecto, Colaborador y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /colaboradores y GET /colaboradores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees ColaboradoresModule, ColaboradoresService ni ColaboradoresController. La Entity
Colaborador sigue en src/colaboradores/entities/colaborador.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

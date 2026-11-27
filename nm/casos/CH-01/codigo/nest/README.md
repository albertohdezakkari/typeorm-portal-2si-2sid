# CH-01 · Animal ↔ Cuidador

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Animal, Cuidador y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /cuidadores y GET /cuidadores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees CuidadoresModule, CuidadoresService ni CuidadoresController. La Entity
Cuidador sigue en src/cuidadores/entities/cuidador.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

# CH-29 · Cosecha ↔ Agricultor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Cosecha, Agricultor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /agricultores y GET /agricultores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees AgricultoresModule, AgricultoresService ni AgricultoresController. La Entity
Agricultor sigue en src/agricultores/entities/agricultor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

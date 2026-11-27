# CH-17 · Escena ↔ Actor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Escena, Actor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /actores y GET /actores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees ActoresModule, ActoresService ni ActoresController. La Entity
Actor sigue en src/actores/entities/actor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

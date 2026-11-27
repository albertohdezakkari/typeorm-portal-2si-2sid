# CH-23 · Comanda ↔ Cocinero

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Comanda, Cocinero y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /cocineros y GET /cocineros. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees CocinerosModule, CocinerosService ni CocinerosController. La Entity
Cocinero sigue en src/cocineros/entities/cocinero.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

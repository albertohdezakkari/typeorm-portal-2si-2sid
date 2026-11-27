# CH-03 · Pieza ↔ Restaurador

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Pieza, Restaurador y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /restauradores y GET /restauradores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees RestauradoresModule, RestauradoresService ni RestauradoresController. La Entity
Restaurador sigue en src/restauradores/entities/restaurador.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

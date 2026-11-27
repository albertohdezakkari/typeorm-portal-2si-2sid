# CH-24 · Pista ↔ Entrenador

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Pista, Entrenador y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /entrenadores y GET /entrenadores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees EntrenadoresModule, EntrenadoresService ni EntrenadoresController. La Entity
Entrenador sigue en src/entrenadores/entities/entrenador.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

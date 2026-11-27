# CH-19 · Embarcacion ↔ Tripulante

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Embarcacion, Tripulante y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /tripulantes y GET /tripulantes. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees TripulantesModule, TripulantesService ni TripulantesController. La Entity
Tripulante sigue en src/tripulantes/entities/tripulante.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

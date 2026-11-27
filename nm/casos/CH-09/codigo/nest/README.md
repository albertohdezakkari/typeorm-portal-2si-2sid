# CH-09 · Reparacion ↔ Mecanico

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Reparacion, Mecanico y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /mecanicos y GET /mecanicos. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees MecanicosModule, MecanicosService ni MecanicosController. La Entity
Mecanico sigue en src/mecanicos/entities/mecanico.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

# CH-20 · Trayecto ↔ Conductor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Trayecto, Conductor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /conductores y GET /conductores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees ConductoresModule, ConductoresService ni ConductoresController. La Entity
Conductor sigue en src/conductores/entities/conductor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

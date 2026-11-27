# CH-10 · Habitacion ↔ Enfermero

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Habitacion, Enfermero y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /enfermeros y GET /enfermeros. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees EnfermerosModule, EnfermerosService ni EnfermerosController. La Entity
Enfermero sigue en src/enfermeros/entities/enfermero.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

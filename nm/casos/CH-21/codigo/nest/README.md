# CH-21 · Muestra ↔ Analista

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Muestra, Analista y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /analistas y GET /analistas. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees AnalistasModule, AnalistasService ni AnalistasController. La Entity
Analista sigue en src/analistas/entities/analista.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

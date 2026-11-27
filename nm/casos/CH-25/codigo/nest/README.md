# CH-25 · Programa ↔ Locutor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Programa, Locutor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /locutores y GET /locutores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees LocutoresModule, LocutoresService ni LocutoresController. La Entity
Locutor sigue en src/locutores/entities/locutor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

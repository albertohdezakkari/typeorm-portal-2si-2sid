# CH-02 · Parcela ↔ Cultivador

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Parcela, Cultivador y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /cultivadores y GET /cultivadores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees CultivadoresModule, CultivadoresService ni CultivadoresController. La Entity
Cultivador sigue en src/cultivadores/entities/cultivador.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

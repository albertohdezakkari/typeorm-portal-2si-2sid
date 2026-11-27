# CH-13 · Proyeccion ↔ Tecnico

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Proyeccion, Tecnico y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /tecnicos y GET /tecnicos. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees TecnicosModule, TecnicosService ni TecnicosController. La Entity
Tecnico sigue en src/tecnicos/entities/tecnico.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

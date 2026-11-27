# CH-14 · Zona ↔ Jardinero

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Zona, Jardinero y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /jardineros y GET /jardineros. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees JardinerosModule, JardinerosService ni JardinerosController. La Entity
Jardinero sigue en src/jardineros/entities/jardinero.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

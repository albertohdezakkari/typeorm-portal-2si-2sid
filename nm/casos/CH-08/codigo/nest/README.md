# CH-08 · Producto ↔ Panadero

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Producto, Panadero y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /panaderos y GET /panaderos. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees PanaderosModule, PanaderosService ni PanaderosController. La Entity
Panadero sigue en src/panaderos/entities/panadero.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

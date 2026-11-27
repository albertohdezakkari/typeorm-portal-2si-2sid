# CH-04 · Publicacion ↔ Autor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Publicacion, Autor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /autores y GET /autores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees AutoresModule, AutoresService ni AutoresController. La Entity
Autor sigue en src/autores/entities/autor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

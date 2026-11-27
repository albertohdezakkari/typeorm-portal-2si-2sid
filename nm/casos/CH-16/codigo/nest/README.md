# CH-16 · Articulo ↔ Vendedor

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Articulo, Vendedor y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /vendedores y GET /vendedores. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees VendedoresModule, VendedoresService ni VendedoresController. La Entity
Vendedor sigue en src/vendedores/entities/vendedor.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

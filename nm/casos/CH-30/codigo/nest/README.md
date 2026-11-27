# CH-30 · Funcion ↔ Interprete

La ampliación N:M continúa el proyecto 1:N. Usa un único AsignacionesModule,
que registra Funcion, Interprete y Asignacion. Un AsignacionesService recibe
los tres repositorios y un AsignacionesController atiende todas las rutas N:M,
incluidos POST /interpretes y GET /interpretes. AppModule importa este módulo una vez.
Los módulos existentes del 1:N conservan sus operaciones.

No crees InterpretesModule, InterpretesService ni InterpretesController. La Entity
Interprete sigue en src/interpretes/entities/interprete.entity.ts. Las altas se hacen
mediante POST, usando los IDs reales de las respuestas; no hay scripts de carga.
Mantén npm run start:dev abierto y ejecuta los curl en otra terminal.

# Arturo · ampliación N:M en Nest + TypeORM

Continúa en el mismo backend de Ayuntamiento y Obra que ya preparaste en 1:N. Conserva su conexión y sus datos.

## Orden de trabajo

1. Crea `Profesional` y `Asignacion` en sus carpetas `entities`.
2. Relaciona ambas y amplía la Entity `Obra` existente.
3. Configura los módulos e impórtalos en `AppModule`.
4. Crea `ProfesionalesService` y `ProfesionalesController`.
5. Crea `AsignacionesService` y `AsignacionesController`; añade sus métodos en el orden del cuaderno.
6. Prueba cada método con curl. Los datos se crean mediante los Controllers.

El Repository nativo de TypeORM se inyecta directamente en el Service. `synchronize: true` crea las tablas desde las Entities.

En Terminal 1, dentro del backend que ya funcionaba:

```bash
npm run start:dev
```

En Terminal 2, crea un profesional a través de su Controller:

```bash
curl -i -X POST "http://localhost:3000/profesionales" \
  -H 'Content-Type: application/json' \
  -d '{"nombre":"Diego","apellidos":"Ruiz López","email":"diego.ruiz@example.test"}'
curl -i http://localhost:3000/profesionales
curl -i http://localhost:3000/obras
```

Anota el ID devuelto por POST y el de una obra existente. Utilízalos en los casos de asignar, consultar, cambiar rol y quitar vínculo. El cuaderno usa la obra 7 y el profesional 1 como ejemplo: sustitúyelos por tus IDs reales.

La N:M no requiere un script de carga ni un fichero de IDs. El esquema lógico y sus dibujos ilustran la relación; las altas se hacen con los Controllers que acabas de programar.

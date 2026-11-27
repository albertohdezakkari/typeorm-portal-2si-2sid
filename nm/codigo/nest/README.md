# Arturo · backend Nest + TypeORM

Esta referencia continúa el backend de [examen-typeorm-27-11-26-01](https://github.com/albertohdezakkari/examen-typeorm-27-11-26-01), revisión `87d1475`. El recorrido guiado está en el [cuaderno de Arturo](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#1n): elige su correo y pulsa **Preparar proyecto base → Preparar mi backend paso a paso**.

El proyecto del alumno se clona una vez. Se trabaja dentro de `backend`. Primero se prepara Ayuntamiento → Obra (1:N); después se añaden Profesional y Asignacion (N:M) en esa misma carpeta.

## Archivos

- `src/app.module.ts`: conserva la conexión y carga los tres módulos.
- `src/salud.controller.ts`: comprueba la conexión en `/salud`.
- Cada recurso tiene un módulo, un Service y un Controller.
- Las Entities definen columnas y relaciones. `synchronize: true` crea las tablas.
- `Repository<Entity>` se inyecta directamente en el Service. No hay clases Repository propias.
- `src/datos/cargar-datos.ts` carga los ejemplos 1:N; `cargar-datos-nm.ts` añade los de N:M. Ambos usan las Entities.

## Ejecutar esta referencia completa

Necesitas Node 20.19.4 o superior y PostgreSQL encendido. Abre una terminal en la carpeta que contiene este `package.json`.

```bash
npm ci --legacy-peer-deps
code .env
```

Guarda en `.env` tu contraseña real:

```dotenv
DB_PASSWORD=ESCRIBE_TU_CONTRASEÑA
```

Los demás valores se leen de `.env.example`. Si tu conexión es diferente, añade sus valores a `.env`. Este archivo no se sube a GitHub.

En Terminal 1:

```bash
npm run build
node dist/datos/cargar-datos.js
node dist/datos/cargar-datos-nm.js
npm run start:dev
```

Deja Terminal 1 abierta. En Terminal 2, dentro de la misma carpeta:

```bash
. ./ids-aula.env
curl -i http://localhost:3000/salud
curl -i http://localhost:3000/obras
curl -i "http://localhost:3000/obras/$OBRA_1_ID/asignaciones"
```

`ids-aula.env` contiene los IDs reales de tu base. Los IDs de los dibujos son ejemplos. El cuaderno muestra, en orden, los archivos y las pruebas de cada caso.

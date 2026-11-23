# Obras y profesionales · ampliación N:M · CH-22

Abre el [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm), selecciona tu correo en el contexto de Arturo y entra en **Ampliación N:M**.

1. Entiende la situación y lee el esquema lógico.
2. Compara las tablas SQL con las tablas y el índice de DynamoDB.
3. Prepara los modelos y carga los datos nuevos.
4. Realiza los seis casos: profesionales, asignar, leer por obra, leer por profesional, cambiar rol y quitar vínculo.
5. Comprueba las respuestas y los datos guardados. Conserva tus evidencias.

Puedes cambiar entre Nest + TypeORM y Serverless + Toolbox en cada concepto. Observa las explicaciones numeradas, completa las piezas y aplica después los archivos completos en tu proyecto real. Cada caja copia solo su contenido.

## Tu proyecto

Continúa en `mi-practica/nest` o `mi-practica/serverless`, dentro de tu copia personal. Conserva tus tablas, archivos y datos 1:N. La obra 7 queda en ayuntamiento 2 y presupuesto 15000 al terminar el recorrido anterior.

Si partes de cero, usa **Abrir preparación 1:N** en el cuaderno. Reutiliza las bases existentes de [Nest + TypeORM](https://github.com/albertohdezakkari/typeorm-base) y [Serverless](https://github.com/albertohdezakkari/festival-checkin-01), con sus recorridos de configuración. Después aplica la ampliación N:M.

Los directorios `codigo/nest` y `codigo/cloud` contienen el resultado completo de referencia, incluidos los casos anteriores. Cada paso del cuaderno muestra la versión del archivo que necesitas en ese momento; no importes todos los casos antes de crearlos.

Para una base vacía de referencia, `datos-iniciales.sql` (Nest) y `cargar-datos-1n.sh` (Serverless) preparan las obras anteriores; después `datos-nm.sql` y `cargar-datos-nm.sh` añaden los nuevos datos. En tu práctica existente utiliza solo la carga N:M. No repitas las altas PartiQL sobre claves que ya existen.

## Modelo y datos

- `PROFESIONAL`: ID, nombre, apellidos, email.
- `ASIGNACION`: clave compuesta `(ID_OBRA, ID_PROFESIONAL)` y ROL.
- En DynamoDB: `ASIGNACIONES` usa PK `OBRA_ID` y SK `PROFESIONAL_ID`; `PorProfesional` invierte las claves y proyecta ROL.
- Datos iniciales: `(7,1,Electricista)`, `(7,2,Arquitecta)`, `(8,1,Coordinador)`.
- El caso de asignar crea `(8,2,Arquitecta)`. Repetirlo devuelve 409 sin sobrescribir.
- Después de modificar y quitar `(7,1)`, quedan `(7,2)`, `(8,1)` y `(8,2)`. Las obras y los profesionales permanecen.

El índice es eventualmente consistente. Si acabas de escribir, repite la lectura por profesional cuando se haya actualizado. Los listados de asignaciones devuelven IDs y ROL; no leen automáticamente el perfil completo de cada profesional.

## Pruebas y fichas

Cada caso tiene su `curl`. Serverless también incluye el fichero JSON de evento y su `aws lambda invoke`; `body` es texto JSON y `pathParameters` conserva los IDs de la ruta. Utiliza curl o Invoke para una misma alta; repetir ambas llamadas puede crear otro perfil o devolver el conflicto de asociación.

Las [nueve fichas imprimibles](fichas-nm-ch22.pdf) acompañan el esquema, los modelos, la traza de asignación, los seis casos y la comprobación final. El código copiable del cuaderno conserva las líneas originales; las líneas largas pueden ajustarse visualmente al imprimir.

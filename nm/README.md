# Recorridos N:M · todo el alumnado

## Piloto Arturo · lectura completa · 27/11/2026

Arturo (CH-22) estudia 1:N y N:M con los archivos completos visibles y un botón para copiar su contenido. No hay animaciones, puzles ni requisitos de montaje para avanzar. Las explicaciones y los dibujos permanecen como apoyo estático. Tecnología, caso y archivo seleccionado comparten sus colores en las dos relaciones mediante `lectura.css`. Se conservan las marcas anteriores y la posición del recorrido 1:N. Al abrir N:M, Arturo empieza en «01 · Entender la N:M», con su cabecera visible desde arriba. Los demás alumnos mantienen su recorrido hasta validar este piloto.

Abre el [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm), selecciona tu correo y elige **Relación N:M**. Los 30 alumnos tienen su ampliación contextualizada: modelos, código por capas, seis casos, animaciones, puzles y fichas imprimibles. **Relación 1:N** conserva el proyecto anterior y su avance.

Consulta el [índice de los 30 recorridos, sus PDF y su código](RECORRIDOS.md). La ampliación continúa la carpeta real del backend ya preparado; no repite su instalación ni su configuración. Los recorridos conservan 60 pasos Serverless. Nest tiene 38 pasos en todos los contextos, con Entities completas y Service y Controller compartidos por recurso. Sus datos de avance se guardan por correo, contexto y unidad, separados del 1:N.

`scripts/generar-nm-alumnado.py` especializa las plantillas validadas de `scripts/generar-nm.py` y `nm/taller.js` usando `scripts/nm-contextos.json`. Lee la base 1:N propia de cada contexto desde `preparar/CH-xx.json`; no transforma la base de Arturo en otra distinta. `--pdf` genera también las fichas a partir de los mismos archivos y de las imágenes de los esquemas incluidas. Los resultados están en `nm/casos/CH-xx/`. Arturo conserva los archivos, las URL y las claves de avance originales.

## Ejemplo validado · Obras y profesionales · CH-22

Todos los contextos siguen la versión Nest sencilla validada con Arturo: sus operaciones usan directamente el repositorio de TypeORM dentro del Service y se agrupan en un Controller por recurso. No hay clases Repository propias. La ampliación conserva los cinco casos 1:N y añade los seis casos N:M. Las fichas impresas anteriores siguen disponibles como referencia; su traza se conserva en la plantilla de impresión.

El contenido siguiente documenta la referencia original de Arturo. Los demás recorridos emplean sus propias entidades, atributos, rutas y roles, descritos en su README.

1. Entiende la situación y lee el esquema lógico.
2. Compara las tablas SQL con las tablas y el índice de DynamoDB.
3. Prepara los modelos y carga los datos nuevos.
4. Realiza los seis casos: profesionales, asignar, leer por obra, leer por profesional, cambiar rol y quitar vínculo.
5. Comprueba las respuestas y los datos guardados. Conserva tus evidencias.

Puedes cambiar entre Nest + TypeORM y Serverless + Toolbox en cada concepto. Observa las explicaciones numeradas, completa las piezas y aplica después los archivos completos en tu proyecto real. Cada caja copia solo su contenido.

## Tu proyecto

Continúa en la carpeta real de tu backend 1:N, con el nombre y la ubicación que elegiste: en Nest contiene `package.json` y `src`; en Serverless, también `serverless.yml`. Abre una terminal en esa carpeta. Si trabajas desde otro ordenador, clona tu propio repositorio y abre su backend. Conserva tus tablas, archivos y datos 1:N. La obra 7 queda en ayuntamiento 2 y presupuesto 15000 al terminar el recorrido anterior.

Si partes de cero, usa **Abrir preparación 1:N** en el cuaderno. Reutiliza las bases existentes de [Nest + TypeORM](https://github.com/albertohdezakkari/typeorm-base) y [Serverless](https://github.com/albertohdezakkari/festival-checkin-01), con sus recorridos de configuración. Después aplica la ampliación N:M.

Los directorios `codigo/nest` y `codigo/cloud` contienen el resultado completo de referencia, incluidos los casos anteriores. Cada paso del cuaderno muestra la versión del archivo que necesitas en ese momento; no importes todos los casos antes de crearlos.

En todos los contextos, Nest carga los ejemplos con `src/datos/cargar-datos.ts` y los vínculos con `src/datos/cargar-datos-nm.ts`: ambos usan las Entities de TypeORM. Los IDs generados se recuperan con `. ./ids-aula.env` antes de las pruebas. `synchronize: true` crea las tablas a partir de las Entities. Al retomar una práctica existente, conserva sus datos y continúa en el paso correspondiente. Serverless mantiene `cargar-datos-1n.sh` y `cargar-datos-nm.sh`; no repitas las altas PartiQL sobre claves existentes. La revisión sin SQL externo, validada con Arturo, está aplicada a todos los contextos.

Los nombres de las tablas leen directamente `TALLER_EQUIPO` con `${env:TALLER_EQUIPO}`. Por ejemplo, `ASIGNACIONES_${env:TALLER_EQUIPO}` pasa a ser `ASIGNACIONES_equipo01` si has ejecutado `export TALLER_EQUIPO=equipo01`. No necesitas pasar por otra clave del YAML.

## Un único acceso desde la Entity

Los repositories de esta ampliación y el código completo de referencia usan la acción oficial `EntityRepository` de Toolbox 2.11.1:

```javascript
import { EntityRepository } from 'dynamodb-toolbox/entity/actions/repository';

const { Items = [] } = await MODELO_ASIGNACION.build(EntityRepository).query(
  { partition: obraId },
  { consistent: true }
);
```

Prepara el recurso en YAML, describe Table y sus claves y después crea Entity con todos sus campos. En las operaciones importa el modelo y utiliza `build(EntityRepository)`; ya no importas Table en el repository. Los métodos envían la operación y devuelven su respuesta: no llevan `.send()`.

| Método del modelo | Operación DynamoDB que utiliza |
| --- | --- |
| `get(clave, opciones)` | `GetItemCommand` |
| `put(item, opciones)` | `PutItemCommand` |
| `scan(opciones)` | `ScanCommand` |
| `query(consulta, opciones)` | `QueryCommand` |
| `update(item, opciones)` | `UpdateItemCommand` |
| `delete(clave, opciones)` | `DeleteItemCommand` |

`EntityRepository` es una utilidad de Toolbox dentro de tu capa repository; no añade otra capa a la aplicación. Query y Scan siguen leyendo la tabla o el índice definidos en el modelo. Los listados conservan la paginación propia de DynamoDB; esta forma de acceso no elimina sus límites.

Referencia: [EntityRepository, documentación oficial](https://www.dynamodbtoolbox.com/docs/entities/actions/repository).

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

La generación común se reproduce con `python3 scripts/nest_sencillo.py`. Conserva los nombres y campos de cada contexto; no genera ni modifica los PDF impresos. En Nest: Entities → Service → Controller → registro una sola vez → ejecutar y probar. En Serverless se conserva el recorrido con EntityRepository.

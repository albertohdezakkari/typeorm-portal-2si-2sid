# Taller de las APIs de cada alumno

Los módulos, Services y Controllers nuevos se generan con `npx --offline nest g module nombre-del-caso`, `npx --offline nest g service nombre-del-caso --no-spec` y `npx --offline nest g controller nombre-del-caso --no-spec`. Nest crea las carpetas y registra las clases. Después completa el código y `TypeOrmModule.forFeature`; en los siguientes casos abre y amplía los mismos archivos, sin repetir generate.

En el [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/), elige tu correo, lee el README de la base en **Preparar proyecto base** y continúa en **Entrenar con mis fichas**.

La relación 1:N tiene 27 pasos Nest y 31 Serverless. Se programan los dos extremos: Entities, Service y Controller del principal, su módulo y las altas y listados; después, los casos del relacionado con su FK. En Serverless, las rutas se conectan a sus Handlers, Services y Repositories basados en Entity.

Todas las altas se hacen con peticiones normales a esas APIs. La zona **Prueba ambos lados de la relación** prepara un curl por acción, con datos e IDs editables. Copia el ID de la respuesta de POST y úsalo al crear el relacionado. No hay scripts de datos, ficheros de IDs ni inserciones directas en DynamoDB.

La ampliación N:M continúa el mismo proyecto y las mismas APIs 1:N. Los archivos se muestran completos y se pueden copiar; menús abiertos, colores comunes y selector de tecnología a la derecha. Las comprobaciones se ejecutan en la terminal del alumno.

## Integración

- `portal-taller.js` recibe el contexto del selector existente y abre el taller.
- `inicio.js` carga la plantilla, el contexto y el estado del mismo navegador.
- `taller.js` muestra los archivos completos y el apoyo gráfico común.
- `casos/` contiene solo contextos y ejemplos educativos, sin identidades.
- `verificacion.json` conserva las huellas de cada contexto y de su PDF fuente.

No existe un inicio de sesión nuevo. El correo elegido personaliza el material;
el progreso reside en `localStorage`, separado por correo y contexto mediante
una clave derivada. No se sincroniza entre dispositivos ni acredita una entrega.
El ejemplo docente tiene su propia clave de progreso.

## Actualizar los contextos

Desde la raíz de este repositorio, con Python y `pypdf` instalados:

```bash
python3 scripts/generar-taller.py --fuentes /ruta/a/fuentes --pdfs /ruta/a/pdf
```

El compilador coteja los 30 PDF de cuatro páginas y conserva su reparto actual.
El ejemplo docente CH-13 se genera aparte. No se copian los PDF personalizados
ni el censo a los archivos del taller. `scripts/plantillas/ch-02.json` conserva
el recorrido de referencia; el resto usa los modelos originales de su ficha.

Para comprobar TypeScript, relaciones TypeORM y las seis operaciones Toolbox:

```bash
python3 scripts/verificar-codigo-taller.py --nest-deps /ruta/a/node_modules --toolbox-deps /ruta/a/node_modules
```

La comprobación compila los 31 contextos y ejecuta handlers, services y
repositories con un cliente DynamoDB simulado. No conecta a servicios remotos.

Al cambiar el orden o significado de las piezas, actualizar también la versión
del estado y su restauración para no atribuir aciertos a un ejercicio distinto.

## Preparación completa en cada contexto

`scripts/campos_modelo.py` vincula los seis campos del ER de cada ficha con sus
propias declaraciones TypeORM y Toolbox. Se conservan las Entities, las rutas
y los valores del contexto. El atributo `after` distingue líneas iguales de
entidades diferentes en el mismo archivo de modelos.

Todos los recorridos ofrecen pestañas distribuidas en filas, explicación actual
resaltada, posición «X de Y» y enlaces de los campos al código. El inventario junto
a cada tabla del YAML es un comentario; los atributos normales se describen en
`schema: item(...)`. `NonKeyAttributes` conserva su función de proyección en el
índice con `INCLUDE`. En Cine, la proyección utiliza PELICULA, igual que su modelo.

`preparationRevision` renueva solo los dos ejercicios de preparación ampliados,
conservando el resto del progreso. Dos piezas con texto idéntico se consideran
equivalentes. El progreso de Arturo ya utiliza esa revisión y se conserva.

La comprobación técnica puede limitarse con `--case-id CH-22`. Además de compilar,
verifica YAML, claves, proyección, columnas de los metadatos TypeORM y todos los
atributos del ítem que Toolbox prepara para cada Entity, sin conectar a servicios
remotos.

## Acceso uniforme a DynamoDB

Todos los repositories de Serverless parten de `MODELO_….build(EntityRepository)` y utilizan `get`, `put`, `scan`, `query`, `update` o `delete`. Estos métodos envían la operación y no necesitan `.send()`. Table y sus índices se preparan dentro del fichero de modelos; los repositories importan la Entity.

El generador aplica esta adaptación mediante `scripts/entrenar_entity_repository.py`, compartiendo la conversión oficial con la ampliación N:M. Los PDF impresos conservan su contexto, campos y casos; el código actualizado aparece identificado como «acceso uniforme con EntityRepository». No se reescriben las fichas originales. Solo se renuevan los puzles de los repositories Serverless revisados; el resto de respuestas, posiciones y aciertos se conserva.

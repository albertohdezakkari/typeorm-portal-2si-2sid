# Taller integrado en las fichas

## Piloto Arturo · lectura completa · 27/11/2026

Arturo (CH-22) estudia 1:N y N:M con los archivos completos visibles y un botón para copiar su contenido. No hay animaciones, puzles ni requisitos de montaje para avanzar. Las explicaciones y los dibujos permanecen como apoyo estático. Tecnología, caso y archivo seleccionado comparten sus colores en las dos relaciones mediante `lectura.css`. Se conservan las marcas anteriores y la posición del recorrido 1:N. Al abrir N:M, Arturo empieza en «01 · Entender la N:M», con su cabecera visible desde arriba. Los demás alumnos mantienen su recorrido hasta validar este piloto.

Acceso: [portal habitual → elegir correo → 10 · Entrenar con mis fichas](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#entrenar).

El selector existente conserva sus asignaciones. Cada contexto ofrece 26 pasos
de Nest/TypeORM y 26 de Serverless/DynamoDB Toolbox: observar, montar y comprobar.
Las explicaciones de Entities y de Table/Entity enlazan con los repositories.
Los ejercicios son simulaciones visuales; las operaciones reales se prueban en
el proyecto del alumno.

## Integración

- `portal-taller.js` recibe el contexto del selector existente y abre el taller.
- `inicio.js` carga la plantilla, el contexto y el estado del mismo navegador.
- `taller.js` contiene el motor compartido de animación, dibujo y puzles.
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

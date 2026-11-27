# Taller integrado en las fichas

La versión validada con Arturo está aplicada a todos los alumnos. En el [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/), elige tu correo, abre **1 · Preparar proyecto base**, lee su README completo y continúa en **2 · Entrenar con mis fichas**.

Cada contexto conserva sus entidades, campos y cinco casos 1:N: 22 pasos Nest/TypeORM y 26 Serverless/DynamoDB Toolbox. Los archivos completos se ven y se copian directamente, con sus explicaciones y dibujos estáticos. No hay animaciones, puzles ni montaje obligatorio. Las comprobaciones reales se ejecutan en el backend del alumno.

La ampliación N:M continúa ese mismo proyecto. Los dos recorridos comparten sus colores, menús abiertos a todo el ancho y selector de tecnología compacto a la derecha. Nest organiza Entities → módulo → Service → Controller, con un Service y Controller por recurso. Serverless conserva YAML → Table + Entity → Handler → Service → Repository, con las operaciones desde EntityRepository.

Las marcas anteriores y la posición 1:N se conservan. Al abrir N:M se muestra el primer apartado y la cabecera desde arriba. El progreso pertenece a este navegador y se guarda por correo, contexto y relación.

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

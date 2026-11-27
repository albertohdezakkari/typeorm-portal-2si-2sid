# CH-05 · Actuaciones y artistas · N:M

Continúa tu proyecto **Festival → Actuacion** ya preparado. No reinstales ni reemplaces el 1:N.

Añade **Artista** (ID, NOMBRE, APELLIDOS, EMAIL) y **Asignacion**, cuya clave compuesta es `(ID_ACTUACION, ID_ARTISTA)`, con ROL como dato del vínculo.

En DynamoDB, ASIGNACIONES tiene PK `ACTUACION_ID` y SK `ARTISTA_ID`; el índice `PorArtista` invierte ambas claves y proyecta ROL.

Recorre los diez apartados del [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm) seleccionando tu correo. Alterna Nest + TypeORM / Serverless + Toolbox. Los directorios `codigo/nest` y `codigo/cloud` contienen la referencia completa, pero cada paso te proporciona el archivo acumulativo que corresponde a ese momento.

[Fichas N:M para imprimir](fichas-nm.pdf) · [Esquema lógico](esquema-logico.svg)

Se conservan los registros 7, 8 y 9 de Actuacion. El registro 7 mantiene DURACION_MINUTOS = 85 y FESTIVAL_ID = 2, como al terminar el 1:N. Los números de la ficha son ejemplos visuales. En Nest, las pruebas utilizan los IDs reales cargados desde `ids-aula.env`; los archivos `src/datos/cargar-datos.ts` y `src/datos/cargar-datos-nm.ts` utilizan las Entities de TypeORM, sin SQL manual.

Los seis casos enseñan alta/listado, asignación, lectura en ambas direcciones, cambio de rol y eliminación del vínculo. Se conservan ambos extremos. En Serverless, todos los repositories utilizan `MODELO.build(EntityRepository)`. Cada caso incluye curl y evento/Invoke compatibles con su handler.

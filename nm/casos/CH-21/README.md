# CH-21 · Muestras y analistas · N:M

Continúa tu proyecto **Laboratorio → Muestra** ya preparado. No reinstales ni reemplaces el 1:N.

Añade **Analista** (ID, NOMBRE, APELLIDOS, EMAIL) y **Asignacion**, cuya clave compuesta es `(ID_MUESTRA, ID_ANALISTA)`, con ROL como dato del vínculo.

En DynamoDB, ASIGNACIONES tiene PK `MUESTRA_ID` y SK `ANALISTA_ID`; el índice `PorAnalista` invierte ambas claves y proyecta ROL.

Recorre los diez apartados del [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm) seleccionando tu correo. Alterna Nest + TypeORM / Serverless + Toolbox. Los directorios `codigo/nest` y `codigo/cloud` contienen la referencia completa, pero cada paso te proporciona el archivo acumulativo que corresponde a ese momento.

[Fichas N:M para imprimir](fichas-nm.pdf) · [Esquema lógico](esquema-logico.svg)

Se conservan los registros 7, 8 y 9 de Muestra. El registro 7 mantiene CANTIDAD_ML = 75 y LABORATORIO_ID = 2, como al terminar el 1:N.

Los seis casos enseñan alta/listado, asignación, lectura en ambas direcciones, cambio de rol y eliminación del vínculo. Se conservan ambos extremos. En Serverless, todos los repositories utilizan `MODELO.build(EntityRepository)`. Cada caso incluye curl y evento/Invoke compatibles con su handler.

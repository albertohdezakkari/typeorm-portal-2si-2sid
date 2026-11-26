# CH-13 · Proyecciones y tecnicos · N:M

Continúa tu proyecto **Cine → Proyeccion** ya preparado. No reinstales ni reemplaces el 1:N.

Añade **Tecnico** (ID, NOMBRE, APELLIDOS, EMAIL) y **Asignacion**, cuya clave compuesta es `(ID_PROYECCION, ID_TECNICO)`, con ROL como dato del vínculo.

En DynamoDB, ASIGNACIONES tiene PK `PROYECCION_ID` y SK `TECNICO_ID`; el índice `PorTecnico` invierte ambas claves y proyecta ROL.

Recorre los diez apartados del [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/#nm) seleccionando tu correo. Alterna Nest + TypeORM / Serverless + Toolbox. Los directorios `codigo/nest` y `codigo/cloud` contienen la referencia completa, pero cada paso te proporciona el archivo acumulativo que corresponde a ese momento.

[Fichas N:M para imprimir](fichas-nm.pdf) · [Esquema lógico](esquema-logico.svg)

Se conservan los registros 7, 8 y 9 de Proyeccion. El registro 7 mantiene DURACION_MINUTOS = 215 y CINE_ID = 2, como al terminar el 1:N.

Los seis casos enseñan alta/listado, asignación, lectura en ambas direcciones, cambio de rol y eliminación del vínculo. Se conservan ambos extremos. En Serverless, todos los repositories utilizan `MODELO.build(EntityRepository)`. Cada caso incluye curl y evento/Invoke compatibles con su handler.

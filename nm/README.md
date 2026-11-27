# Cuaderno 1:N y N:M · altas normales por API

En el [cuaderno](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/), elige tu correo y sigue tu contexto. Lee detenidamente el README del proyecto base y continúa en **Entrenar con mis fichas**.

Todos los registros se crean mediante las APIs que programas. Primero prepara las Entities, el Service, Controller y módulo del lado principal; crea y lista sus registros con POST y GET. Después crea los registros relacionados usando el ID real devuelto. La FK se declara en la Entity y el Service recibe la referencia. Cada paso muestra el archivo completo.

En Serverless se sigue Entity → Repository → Service → Handler; el YAML conecta POST y GET con esos handlers. Todas las operaciones de datos parten de EntityRepository. Las altas y lecturas se hacen por API, sin inserciones directas en DynamoDB.

## Probar las peticiones

La zona **Prueba ambos lados de la relación** permite elegir qué añadir o consultar, escribir la URL, los datos y los IDs reales, y copiar un curl sencillo para Terminal 2. La respuesta se observa en la terminal. En Nest, mantén `npm run start:dev` abierto en Terminal 1. En Serverless, guarda y despliega antes de probar.

Los números de las peticiones son ejemplos: utiliza los IDs de tus propias respuestas. No hay scripts de carga, precargas ocultas ni ficheros de IDs.

## Recorridos

- 1:N: 27 pasos Nest y 31 Serverless, incluidas las APIs del principal.
- N:M: 38 pasos Nest y 58 Serverless. Continúa el backend anterior, añade las dos Entities y sus capas y prueba los seis casos mediante la API. Se ha retirado también la precarga de N:M en Serverless.

Menús abiertos y a todo el ancho, archivos completos, explicaciones estáticas y selector de tecnología a la derecha. Entrada en Preparar; N:M se abre por el primer apartado. Las marcas y posiciones compatibles se migran al añadir los nuevos pasos.

## Generación

`scripts/version_estudio.py` aplica las adaptaciones de cada contexto y `scripts/api_sin_precarga.py` define las altas por API y elimina los mecanismos antiguos. Los generadores de preparación, taller y N:M llaman a ese mismo circuito. Los PDF anteriores se conservan como documentos históricos.

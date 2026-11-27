# Recorridos N:M · todo el alumnado

Abre el [cuaderno de clase](https://albertohdezakkari.github.io/typeorm-portal-2si-2sid/), elige tu correo y prepara tu proyecto siguiendo detenidamente el README del repositorio base. Después entra en **2 · Entrenar con mis fichas**. Cada alumno conserva su contexto y los cinco casos 1:N; la relación N:M amplía ese mismo backend.

La versión validada con Arturo está aplicada a los 30 alumnos y al ejemplo docente. Los archivos se muestran completos y se pueden copiar. No hay animaciones ni puzles que bloqueen el avance. Los dibujos y las explicaciones acompañan al código como apoyo estático. Los menús permanecen abiertos y a todo el ancho; el selector de tecnología queda compacto a la derecha. Ambas relaciones comparten los mismos colores de tecnología, caso y archivo seleccionado.

## Orden de trabajo

1. **Preparar proyecto base**: lee el README completo de [Nest + TypeORM](https://github.com/albertohdezakkari/examen-typeorm-27-11-26-01#readme) o la guía [0-codespaces.md de Serverless](https://github.com/albertohdezakkari/festival-checkin-01/blob/main/0-codespaces.md).
2. **Relación 1:N**: Entities y relaciones; conexión del módulo; Service y Controller por recurso; cinco casos con sus comprobaciones. Nest tiene 22 pasos y Serverless, 26.
3. **Relación N:M**: retoma el proyecto anterior, crea las dos Entities nuevas, amplía la Entity existente, conecta los módulos y añade los seis casos. Nest tiene 38 pasos en nueve apartados; Serverless conserva sus 60 pasos en diez apartados.

En Nest, el Service utiliza directamente el Repository de TypeORM inyectado para sus Entities. `synchronize: true` crea las tablas; no se copian consultas SQL de creación. Las altas N:M se hacen mediante los Controllers y sus POST, con los IDs reales devueltos por la API. No se necesita otra precarga ni un fichero de IDs nuevo para ampliar la N:M.

En Serverless, el YAML crea los recursos, Table describe claves e índices y Entity define los atributos. Los repositories realizan las operaciones desde `MODELO.build(EntityRepository)`. Los casos conservan sus llamadas curl e Invoke.

## Navegación y avance

La entrada al cuaderno comienza en **1 · Preparar proyecto base**. Al elegir N:M se abre **01 · Entender la N:M**, con el primer apartado enfocado y el menú visible desde arriba. Se conservan las marcas de los pasos completados y la tecnología elegida. Cada alumno guarda su avance por correo, contexto y relación en este navegador; las respuestas reales se comprueban en su propia terminal.

## Fuentes y generación

Los contextos se relacionan en [RECORRIDOS.md](RECORRIDOS.md). La adaptación se mantiene con `scripts/version_estudio.py`, a partir de las transformaciones validadas en Arturo y de los nombres, campos, rutas y datos propios de cada ficha. Se ejecuta con:

```bash
python3 scripts/version_estudio.py
```

Los generadores de preparación, 1:N y N:M llaman a esa misma adaptación. Los PDF anteriores se conservan como material histórico; esta publicación actualiza el cuaderno web y sus referencias de código.

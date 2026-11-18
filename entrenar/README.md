# Taller integrado en las fichas

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

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Editorial } from '../editoriales/entities/editorial.entity';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const editoriales = db.getRepository(Editorial);
    const publicaciones = db.getRepository(Publicacion);

    const primero = await editoriales.findOneBy({ nombre: 'Editorial Roble' })
      ?? await editoriales.save({ nombre: 'Editorial Roble' });
    const segundo = await editoriales.findOneBy({ nombre: 'Editorial Faro' })
      ?? await editoriales.save({ nombre: 'Editorial Faro' });

    const principal = await publicaciones.findOneBy({ nombre: 'Rutas del Ebro' })
      ?? await publicaciones.save({ nombre: 'Rutas del Ebro', paginas: 80, editorial: primero });
    const secundaria = await publicaciones.findOneBy({ nombre: 'Historias cortas' })
      ?? await publicaciones.save({ nombre: 'Historias cortas', paginas: 240, editorial: segundo });
    const otra = await publicaciones.findOneBy({ nombre: 'Rutas del Ebro · nuevo' })
      ?? await publicaciones.save({ nombre: 'Rutas del Ebro · nuevo', paginas: 400, editorial: primero });

    writeFileSync('ids-aula.env', [
      `export EDITORIAL_1_ID=${primero.id}`,
      `export EDITORIAL_2_ID=${segundo.id}`,
      `export PUBLICACION_1_ID=${principal.id}`,
      `export PUBLICACION_2_ID=${secundaria.id}`,
      `export PUBLICACION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await publicaciones.find({ relations: { editorial: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

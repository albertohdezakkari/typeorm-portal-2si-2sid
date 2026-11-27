import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Editorial } from '../editoriales/entities/editorial.entity';
import { Publicacion } from '../publicaciones/entities/publicacion.entity';
import { Autor } from '../autores/entities/autor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const publicaciones = db.getRepository(Publicacion);
    const editoriales = db.getRepository(Editorial);
    const autores = db.getRepository(Autor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await publicaciones.findOneByOrFail({ nombre: 'Rutas del Ebro' });
    const secundaria = await publicaciones.findOneByOrFail({ nombre: 'Historias cortas' });
    const otra = await publicaciones.findOneByOrFail({ nombre: 'Rutas del Ebro · nuevo' });
    const primero = await editoriales.findOneByOrFail({ nombre: 'Editorial Roble' });
    const segundo = await editoriales.findOneByOrFail({ nombre: 'Editorial Faro' });

    const diego = await autores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await autores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await autores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await autores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { publicacionId: principal.id, autorId: diego.id, rol: 'Redacción' },
      { publicacionId: principal.id, autorId: ana.id, rol: 'Revisión' },
      { publicacionId: secundaria.id, autorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ publicacionId: datos.publicacionId, autorId: datos.autorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export EDITORIAL_1_ID=${primero.id}`,
      `export EDITORIAL_2_ID=${segundo.id}`,
      `export PUBLICACION_1_ID=${principal.id}`,
      `export PUBLICACION_2_ID=${secundaria.id}`,
      `export PUBLICACION_3_ID=${otra.id}`,
      `export AUTOR_1_ID=${diego.id}`,
      `export AUTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { publicacionId: 'ASC', autorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

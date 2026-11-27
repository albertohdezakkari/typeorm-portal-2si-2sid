import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Estudio } from '../estudios/entities/estudio.entity';
import { Escena } from '../escenas/entities/escena.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const estudios = db.getRepository(Estudio);
    const escenas = db.getRepository(Escena);

    const primero = await estudios.findOneBy({ nombre: 'Estudio Prisma' })
      ?? await estudios.save({ nombre: 'Estudio Prisma' });
    const segundo = await estudios.findOneBy({ nombre: 'Estudio Lumen' })
      ?? await estudios.save({ nombre: 'Estudio Lumen' });

    const principal = await escenas.findOneBy({ nombre: 'Escena de apertura' })
      ?? await escenas.save({ nombre: 'Escena de apertura', duracionSegundos: 30, estudio: primero });
    const secundaria = await escenas.findOneBy({ nombre: 'Escena del puente' })
      ?? await escenas.save({ nombre: 'Escena del puente', duracionSegundos: 95, estudio: segundo });
    const otra = await escenas.findOneBy({ nombre: 'Escena de apertura · nuevo' })
      ?? await escenas.save({ nombre: 'Escena de apertura · nuevo', duracionSegundos: 155, estudio: primero });

    writeFileSync('ids-aula.env', [
      `export ESTUDIO_1_ID=${primero.id}`,
      `export ESTUDIO_2_ID=${segundo.id}`,
      `export ESCENA_1_ID=${principal.id}`,
      `export ESCENA_2_ID=${secundaria.id}`,
      `export ESCENA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await escenas.find({ relations: { estudio: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

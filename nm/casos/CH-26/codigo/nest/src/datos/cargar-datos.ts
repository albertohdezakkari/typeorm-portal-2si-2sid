import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Escuela } from '../escuelas/entities/escuela.entity';
import { Aula } from '../aulas/entities/aula.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const escuelas = db.getRepository(Escuela);
    const aulas = db.getRepository(Aula);

    const primero = await escuelas.findOneBy({ nombre: 'Escuela Puente' })
      ?? await escuelas.save({ nombre: 'Escuela Puente' });
    const segundo = await escuelas.findOneBy({ nombre: 'Escuela Encuentro' })
      ?? await escuelas.save({ nombre: 'Escuela Encuentro' });

    const principal = await aulas.findOneBy({ nombre: 'Aula Olmo' })
      ?? await aulas.save({ nombre: 'Aula Olmo', capacidad: 12, escuela: primero });
    const secundaria = await aulas.findOneBy({ nombre: 'Aula Pino' })
      ?? await aulas.save({ nombre: 'Aula Pino', capacidad: 30, escuela: segundo });
    const otra = await aulas.findOneBy({ nombre: 'Aula Olmo · nuevo' })
      ?? await aulas.save({ nombre: 'Aula Olmo · nuevo', capacidad: 54, escuela: primero });

    writeFileSync('ids-aula.env', [
      `export ESCUELA_1_ID=${primero.id}`,
      `export ESCUELA_2_ID=${segundo.id}`,
      `export AULA_1_ID=${principal.id}`,
      `export AULA_2_ID=${secundaria.id}`,
      `export AULA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await aulas.find({ relations: { escuela: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

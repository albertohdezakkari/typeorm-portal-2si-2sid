import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Complejo } from '../complejos/entities/complejo.entity';
import { Pista } from '../pistas/entities/pista.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const complejos = db.getRepository(Complejo);
    const pistas = db.getRepository(Pista);

    const primero = await complejos.findOneBy({ nombre: 'Complejo Municipal' })
      ?? await complejos.save({ nombre: 'Complejo Municipal' });
    const segundo = await complejos.findOneBy({ nombre: 'Complejo del Barrio' })
      ?? await complejos.save({ nombre: 'Complejo del Barrio' });

    const principal = await pistas.findOneBy({ nombre: 'Pista cubierta' })
      ?? await pistas.save({ nombre: 'Pista cubierta', superficieM2: 120, complejo: primero });
    const secundaria = await pistas.findOneBy({ nombre: 'Pista exterior' })
      ?? await pistas.save({ nombre: 'Pista exterior', superficieM2: 300, complejo: segundo });
    const otra = await pistas.findOneBy({ nombre: 'Pista cubierta · nuevo' })
      ?? await pistas.save({ nombre: 'Pista cubierta · nuevo', superficieM2: 540, complejo: primero });

    writeFileSync('ids-aula.env', [
      `export COMPLEJO_1_ID=${primero.id}`,
      `export COMPLEJO_2_ID=${segundo.id}`,
      `export PISTA_1_ID=${principal.id}`,
      `export PISTA_2_ID=${secundaria.id}`,
      `export PISTA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await pistas.find({ relations: { complejo: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

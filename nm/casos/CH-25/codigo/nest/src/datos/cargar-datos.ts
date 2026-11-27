import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Emisora } from '../emisoras/entities/emisora.entity';
import { Programa } from '../programas/entities/programa.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const emisoras = db.getRepository(Emisora);
    const programas = db.getRepository(Programa);

    const primero = await emisoras.findOneBy({ nombre: 'Radio Horizonte' })
      ?? await emisoras.save({ nombre: 'Radio Horizonte' });
    const segundo = await emisoras.findOneBy({ nombre: 'Radio Barrio' })
      ?? await emisoras.save({ nombre: 'Radio Barrio' });

    const principal = await programas.findOneBy({ nombre: 'Buenos días' })
      ?? await programas.save({ nombre: 'Buenos días', duracionMinutos: 30, emisora: primero });
    const secundaria = await programas.findOneBy({ nombre: 'Tarde cultural' })
      ?? await programas.save({ nombre: 'Tarde cultural', duracionMinutos: 90, emisora: segundo });
    const otra = await programas.findOneBy({ nombre: 'Buenos días · nuevo' })
      ?? await programas.save({ nombre: 'Buenos días · nuevo', duracionMinutos: 150, emisora: primero });

    writeFileSync('ids-aula.env', [
      `export EMISORA_1_ID=${primero.id}`,
      `export EMISORA_2_ID=${segundo.id}`,
      `export PROGRAMA_1_ID=${principal.id}`,
      `export PROGRAMA_2_ID=${secundaria.id}`,
      `export PROGRAMA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await programas.find({ relations: { emisora: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

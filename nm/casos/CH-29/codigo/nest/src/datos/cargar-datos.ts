import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Granja } from '../granjas/entities/granja.entity';
import { Cosecha } from '../cosechas/entities/cosecha.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const granjas = db.getRepository(Granja);
    const cosechas = db.getRepository(Cosecha);

    const primero = await granjas.findOneBy({ nombre: 'Granja del Sol' })
      ?? await granjas.save({ nombre: 'Granja del Sol' });
    const segundo = await granjas.findOneBy({ nombre: 'Granja del Monte' })
      ?? await granjas.save({ nombre: 'Granja del Monte' });

    const principal = await cosechas.findOneBy({ nombre: 'Cosecha de tomate' })
      ?? await cosechas.save({ nombre: 'Cosecha de tomate', kilos: 80, granja: primero });
    const secundaria = await cosechas.findOneBy({ nombre: 'Cosecha de calabaza' })
      ?? await cosechas.save({ nombre: 'Cosecha de calabaza', kilos: 220, granja: segundo });
    const otra = await cosechas.findOneBy({ nombre: 'Cosecha de tomate · nuevo' })
      ?? await cosechas.save({ nombre: 'Cosecha de tomate · nuevo', kilos: 380, granja: primero });

    writeFileSync('ids-aula.env', [
      `export GRANJA_1_ID=${primero.id}`,
      `export GRANJA_2_ID=${segundo.id}`,
      `export COSECHA_1_ID=${principal.id}`,
      `export COSECHA_2_ID=${secundaria.id}`,
      `export COSECHA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await cosechas.find({ relations: { granja: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

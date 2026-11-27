import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cooperativa } from '../cooperativas/entities/cooperativa.entity';
import { Lote } from '../lotes/entities/lote.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const cooperativas = db.getRepository(Cooperativa);
    const lotes = db.getRepository(Lote);

    const primero = await cooperativas.findOneBy({ nombre: 'Cooperativa Olivo' })
      ?? await cooperativas.save({ nombre: 'Cooperativa Olivo' });
    const segundo = await cooperativas.findOneBy({ nombre: 'Cooperativa Campo' })
      ?? await cooperativas.save({ nombre: 'Cooperativa Campo' });

    const principal = await lotes.findOneBy({ nombre: 'Lote de manzanas' })
      ?? await lotes.save({ nombre: 'Lote de manzanas', kilos: 40, cooperativa: primero });
    const secundaria = await lotes.findOneBy({ nombre: 'Lote de peras' })
      ?? await lotes.save({ nombre: 'Lote de peras', kilos: 120, cooperativa: segundo });
    const otra = await lotes.findOneBy({ nombre: 'Lote de manzanas · nuevo' })
      ?? await lotes.save({ nombre: 'Lote de manzanas · nuevo', kilos: 200, cooperativa: primero });

    writeFileSync('ids-aula.env', [
      `export COOPERATIVA_1_ID=${primero.id}`,
      `export COOPERATIVA_2_ID=${segundo.id}`,
      `export LOTE_1_ID=${principal.id}`,
      `export LOTE_2_ID=${secundaria.id}`,
      `export LOTE_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await lotes.find({ relations: { cooperativa: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Huerto } from '../huertos/entities/huerto.entity';
import { Parcela } from '../parcelas/entities/parcela.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const huertos = db.getRepository(Huerto);
    const parcelas = db.getRepository(Parcela);

    const primero = await huertos.findOneBy({ nombre: 'Huerto del Río' })
      ?? await huertos.save({ nombre: 'Huerto del Río' });
    const segundo = await huertos.findOneBy({ nombre: 'Huerto del Parque' })
      ?? await huertos.save({ nombre: 'Huerto del Parque' });

    const principal = await parcelas.findOneBy({ nombre: 'Parcela A' })
      ?? await parcelas.save({ nombre: 'Parcela A', superficieM2: 20, huerto: primero });
    const secundaria = await parcelas.findOneBy({ nombre: 'Parcela B' })
      ?? await parcelas.save({ nombre: 'Parcela B', superficieM2: 45, huerto: segundo });
    const otra = await parcelas.findOneBy({ nombre: 'Parcela C' })
      ?? await parcelas.save({ nombre: 'Parcela C', superficieM2: 80, huerto: primero });

    writeFileSync('ids-aula.env', [
      `export HUERTO_1_ID=${primero.id}`,
      `export HUERTO_2_ID=${segundo.id}`,
      `export PARCELA_1_ID=${principal.id}`,
      `export PARCELA_2_ID=${secundaria.id}`,
      `export PARCELA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await parcelas.find({ relations: { huerto: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

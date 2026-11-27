import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Museo } from '../museos/entities/museo.entity';
import { Pieza } from '../piezas/entities/pieza.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const museos = db.getRepository(Museo);
    const piezas = db.getRepository(Pieza);

    const primero = await museos.findOneBy({ nombre: 'Museo del Barrio' })
      ?? await museos.save({ nombre: 'Museo del Barrio' });
    const segundo = await museos.findOneBy({ nombre: 'Museo del Centro' })
      ?? await museos.save({ nombre: 'Museo del Centro' });

    const principal = await piezas.findOneBy({ nombre: 'Vasija azul' })
      ?? await piezas.save({ nombre: 'Vasija azul', antiguedadAnios: 30, museo: primero });
    const secundaria = await piezas.findOneBy({ nombre: 'Reloj de pared' })
      ?? await piezas.save({ nombre: 'Reloj de pared', antiguedadAnios: 120, museo: segundo });
    const otra = await piezas.findOneBy({ nombre: 'Vasija azul · nuevo' })
      ?? await piezas.save({ nombre: 'Vasija azul · nuevo', antiguedadAnios: 180, museo: primero });

    writeFileSync('ids-aula.env', [
      `export MUSEO_1_ID=${primero.id}`,
      `export MUSEO_2_ID=${segundo.id}`,
      `export PIEZA_1_ID=${principal.id}`,
      `export PIEZA_2_ID=${secundaria.id}`,
      `export PIEZA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await piezas.find({ relations: { museo: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

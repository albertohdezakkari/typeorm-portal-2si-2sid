import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Vivero } from '../viveros/entities/vivero.entity';
import { Planta } from '../plantas/entities/planta.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const viveros = db.getRepository(Vivero);
    const plantas = db.getRepository(Planta);

    const primero = await viveros.findOneBy({ nombre: 'Vivero Raíz' })
      ?? await viveros.save({ nombre: 'Vivero Raíz' });
    const segundo = await viveros.findOneBy({ nombre: 'Vivero Hoja' })
      ?? await viveros.save({ nombre: 'Vivero Hoja' });

    const principal = await plantas.findOneBy({ nombre: 'Lavanda' })
      ?? await plantas.save({ nombre: 'Lavanda', alturaCm: 25, vivero: primero });
    const secundaria = await plantas.findOneBy({ nombre: 'Romero' })
      ?? await plantas.save({ nombre: 'Romero', alturaCm: 70, vivero: segundo });
    const otra = await plantas.findOneBy({ nombre: 'Lavanda · nuevo' })
      ?? await plantas.save({ nombre: 'Lavanda · nuevo', alturaCm: 120, vivero: primero });

    writeFileSync('ids-aula.env', [
      `export VIVERO_1_ID=${primero.id}`,
      `export VIVERO_2_ID=${segundo.id}`,
      `export PLANTA_1_ID=${principal.id}`,
      `export PLANTA_2_ID=${secundaria.id}`,
      `export PLANTA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await plantas.find({ relations: { vivero: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

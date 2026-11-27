import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Agencia } from '../agencias/entities/agencia.entity';
import { Excursion } from '../excursiones/entities/excursion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const agencias = db.getRepository(Agencia);
    const excursiones = db.getRepository(Excursion);

    const primero = await agencias.findOneBy({ nombre: 'Agencia Horizonte' })
      ?? await agencias.save({ nombre: 'Agencia Horizonte' });
    const segundo = await agencias.findOneBy({ nombre: 'Agencia Camino' })
      ?? await agencias.save({ nombre: 'Agencia Camino' });

    const principal = await excursiones.findOneBy({ nombre: 'Ruta del bosque' })
      ?? await excursiones.save({ nombre: 'Ruta del bosque', duracionHoras: 2, agencia: primero });
    const secundaria = await excursiones.findOneBy({ nombre: 'Visita al castillo' })
      ?? await excursiones.save({ nombre: 'Visita al castillo', duracionHoras: 6, agencia: segundo });
    const otra = await excursiones.findOneBy({ nombre: 'Ruta del bosque · nuevo' })
      ?? await excursiones.save({ nombre: 'Ruta del bosque · nuevo', duracionHoras: 10, agencia: primero });

    writeFileSync('ids-aula.env', [
      `export AGENCIA_1_ID=${primero.id}`,
      `export AGENCIA_2_ID=${segundo.id}`,
      `export EXCURSION_1_ID=${principal.id}`,
      `export EXCURSION_2_ID=${secundaria.id}`,
      `export EXCURSION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await excursiones.find({ relations: { agencia: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

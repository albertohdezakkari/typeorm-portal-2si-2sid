import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Taller } from '../talleres/entities/taller.entity';
import { Reparacion } from '../reparaciones/entities/reparacion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const talleres = db.getRepository(Taller);
    const reparaciones = db.getRepository(Reparacion);

    const primero = await talleres.findOneBy({ nombre: 'Taller Norte' })
      ?? await talleres.save({ nombre: 'Taller Norte' });
    const segundo = await talleres.findOneBy({ nombre: 'Taller del Barrio' })
      ?? await talleres.save({ nombre: 'Taller del Barrio' });

    const principal = await reparaciones.findOneBy({ nombre: 'Ajuste de frenos' })
      ?? await reparaciones.save({ nombre: 'Ajuste de frenos', costeCentimos: 2500, taller: primero });
    const secundaria = await reparaciones.findOneBy({ nombre: 'Cambio de cadena' })
      ?? await reparaciones.save({ nombre: 'Cambio de cadena', costeCentimos: 7000, taller: segundo });
    const otra = await reparaciones.findOneBy({ nombre: 'Ajuste de frenos · nuevo' })
      ?? await reparaciones.save({ nombre: 'Ajuste de frenos · nuevo', costeCentimos: 12000, taller: primero });

    writeFileSync('ids-aula.env', [
      `export TALLER_1_ID=${primero.id}`,
      `export TALLER_2_ID=${segundo.id}`,
      `export REPARACION_1_ID=${principal.id}`,
      `export REPARACION_2_ID=${secundaria.id}`,
      `export REPARACION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await reparaciones.find({ relations: { taller: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

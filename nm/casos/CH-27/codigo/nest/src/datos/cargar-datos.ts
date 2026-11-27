import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Urbanizacion } from '../urbanizaciones/entities/urbanizacion.entity';
import { Plaza } from '../plazas/entities/plaza.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const urbanizaciones = db.getRepository(Urbanizacion);
    const plazas = db.getRepository(Plaza);

    const primero = await urbanizaciones.findOneBy({ nombre: 'Urbanización Jardín' })
      ?? await urbanizaciones.save({ nombre: 'Urbanización Jardín' });
    const segundo = await urbanizaciones.findOneBy({ nombre: 'Urbanización Lago' })
      ?? await urbanizaciones.save({ nombre: 'Urbanización Lago' });

    const principal = await plazas.findOneBy({ nombre: 'Plaza P-01' })
      ?? await plazas.save({ nombre: 'Plaza P-01', superficieM2: 10, urbanizacion: primero });
    const secundaria = await plazas.findOneBy({ nombre: 'Plaza P-02' })
      ?? await plazas.save({ nombre: 'Plaza P-02', superficieM2: 18, urbanizacion: segundo });
    const otra = await plazas.findOneBy({ nombre: 'Plaza P-01 · nuevo' })
      ?? await plazas.save({ nombre: 'Plaza P-01 · nuevo', superficieM2: 38, urbanizacion: primero });

    writeFileSync('ids-aula.env', [
      `export URBANIZACION_1_ID=${primero.id}`,
      `export URBANIZACION_2_ID=${segundo.id}`,
      `export PLAZA_1_ID=${principal.id}`,
      `export PLAZA_2_ID=${secundaria.id}`,
      `export PLAZA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await plazas.find({ relations: { urbanizacion: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

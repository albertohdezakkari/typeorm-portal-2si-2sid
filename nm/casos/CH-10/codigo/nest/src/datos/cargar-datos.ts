import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Hospital } from '../hospitales/entities/hospital.entity';
import { Habitacion } from '../habitaciones/entities/habitacion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const hospitales = db.getRepository(Hospital);
    const habitaciones = db.getRepository(Habitacion);

    const primero = await hospitales.findOneBy({ nombre: 'Hospital Central' })
      ?? await hospitales.save({ nombre: 'Hospital Central' });
    const segundo = await hospitales.findOneBy({ nombre: 'Hospital del Valle' })
      ?? await hospitales.save({ nombre: 'Hospital del Valle' });

    const principal = await habitaciones.findOneBy({ nombre: 'Habitación A' })
      ?? await habitaciones.save({ nombre: 'Habitación A', camas: 1, hospital: primero });
    const secundaria = await habitaciones.findOneBy({ nombre: 'Habitación B' })
      ?? await habitaciones.save({ nombre: 'Habitación B', camas: 3, hospital: segundo });
    const otra = await habitaciones.findOneBy({ nombre: 'Habitación A · nuevo' })
      ?? await habitaciones.save({ nombre: 'Habitación A · nuevo', camas: 5, hospital: primero });

    writeFileSync('ids-aula.env', [
      `export HOSPITAL_1_ID=${primero.id}`,
      `export HOSPITAL_2_ID=${segundo.id}`,
      `export HABITACION_1_ID=${principal.id}`,
      `export HABITACION_2_ID=${secundaria.id}`,
      `export HABITACION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await habitaciones.find({ relations: { hospital: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

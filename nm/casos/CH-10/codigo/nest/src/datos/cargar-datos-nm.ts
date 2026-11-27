import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Hospital } from '../hospitales/entities/hospital.entity';
import { Habitacion } from '../habitaciones/entities/habitacion.entity';
import { Enfermero } from '../enfermeros/entities/enfermero.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const habitaciones = db.getRepository(Habitacion);
    const hospitales = db.getRepository(Hospital);
    const enfermeros = db.getRepository(Enfermero);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await habitaciones.findOneByOrFail({ nombre: 'Habitación A' });
    const secundaria = await habitaciones.findOneByOrFail({ nombre: 'Habitación B' });
    const otra = await habitaciones.findOneByOrFail({ nombre: 'Habitación A · nuevo' });
    const primero = await hospitales.findOneByOrFail({ nombre: 'Hospital Central' });
    const segundo = await hospitales.findOneByOrFail({ nombre: 'Hospital del Valle' });

    const diego = await enfermeros.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await enfermeros.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await enfermeros.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await enfermeros.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { habitacionId: principal.id, enfermeroId: diego.id, rol: 'Cuidados' },
      { habitacionId: principal.id, enfermeroId: ana.id, rol: 'Supervisión' },
      { habitacionId: secundaria.id, enfermeroId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ habitacionId: datos.habitacionId, enfermeroId: datos.enfermeroId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export HOSPITAL_1_ID=${primero.id}`,
      `export HOSPITAL_2_ID=${segundo.id}`,
      `export HABITACION_1_ID=${principal.id}`,
      `export HABITACION_2_ID=${secundaria.id}`,
      `export HABITACION_3_ID=${otra.id}`,
      `export ENFERMERO_1_ID=${diego.id}`,
      `export ENFERMERO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { habitacionId: 'ASC', enfermeroId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

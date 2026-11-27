import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Gimnasio } from '../gimnasios/entities/gimnasio.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';
import { Instructor } from '../instructores/entities/instructor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const sesiones = db.getRepository(Sesion);
    const gimnasios = db.getRepository(Gimnasio);
    const instructores = db.getRepository(Instructor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await sesiones.findOneByOrFail({ nombre: 'Pilates inicial' });
    const secundaria = await sesiones.findOneByOrFail({ nombre: 'Entrenamiento funcional' });
    const otra = await sesiones.findOneByOrFail({ nombre: 'Pilates inicial · nuevo' });
    const primero = await gimnasios.findOneByOrFail({ nombre: 'Gimnasio Norte' });
    const segundo = await gimnasios.findOneByOrFail({ nombre: 'Gimnasio Centro' });

    const diego = await instructores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await instructores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await instructores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await instructores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { sesionId: principal.id, instructorId: diego.id, rol: 'Calentamiento' },
      { sesionId: principal.id, instructorId: ana.id, rol: 'Entrenamiento' },
      { sesionId: secundaria.id, instructorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ sesionId: datos.sesionId, instructorId: datos.instructorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export GIMNASIO_1_ID=${primero.id}`,
      `export GIMNASIO_2_ID=${segundo.id}`,
      `export SESION_1_ID=${principal.id}`,
      `export SESION_2_ID=${secundaria.id}`,
      `export SESION_3_ID=${otra.id}`,
      `export INSTRUCTOR_1_ID=${diego.id}`,
      `export INSTRUCTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { sesionId: 'ASC', instructorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

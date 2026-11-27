import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Estacion } from '../estaciones/entities/estacion.entity';
import { Trayecto } from '../trayectos/entities/trayecto.entity';
import { Conductor } from '../conductores/entities/conductor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const trayectos = db.getRepository(Trayecto);
    const estaciones = db.getRepository(Estacion);
    const conductores = db.getRepository(Conductor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await trayectos.findOneByOrFail({ nombre: 'Ruta del valle' });
    const secundaria = await trayectos.findOneByOrFail({ nombre: 'Ruta de la costa' });
    const otra = await trayectos.findOneByOrFail({ nombre: 'Ruta del valle · nuevo' });
    const primero = await estaciones.findOneByOrFail({ nombre: 'Estación Central' });
    const segundo = await estaciones.findOneByOrFail({ nombre: 'Estación Norte' });

    const diego = await conductores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await conductores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await conductores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await conductores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { trayectoId: principal.id, conductorId: diego.id, rol: 'Conducción' },
      { trayectoId: principal.id, conductorId: ana.id, rol: 'Relevo' },
      { trayectoId: secundaria.id, conductorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ trayectoId: datos.trayectoId, conductorId: datos.conductorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export ESTACION_1_ID=${primero.id}`,
      `export ESTACION_2_ID=${segundo.id}`,
      `export TRAYECTO_1_ID=${principal.id}`,
      `export TRAYECTO_2_ID=${secundaria.id}`,
      `export TRAYECTO_3_ID=${otra.id}`,
      `export CONDUCTOR_1_ID=${diego.id}`,
      `export CONDUCTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { trayectoId: 'ASC', conductorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

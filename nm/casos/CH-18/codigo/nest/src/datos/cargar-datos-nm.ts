import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Club } from '../clubes/entities/club.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Monitor } from '../monitores/entities/monitor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const actividades = db.getRepository(Actividad);
    const clubes = db.getRepository(Club);
    const monitores = db.getRepository(Monitor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await actividades.findOneByOrFail({ nombre: 'Taller de fotografía' });
    const secundaria = await actividades.findOneByOrFail({ nombre: 'Ruta urbana' });
    const otra = await actividades.findOneByOrFail({ nombre: 'Taller de fotografía · nuevo' });
    const primero = await clubes.findOneByOrFail({ nombre: 'Club Encuentro' });
    const segundo = await clubes.findOneByOrFail({ nombre: 'Club Horizonte' });

    const diego = await monitores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await monitores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await monitores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await monitores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { actividadId: principal.id, monitorId: diego.id, rol: 'Dinamización' },
      { actividadId: principal.id, monitorId: ana.id, rol: 'Apoyo' },
      { actividadId: secundaria.id, monitorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ actividadId: datos.actividadId, monitorId: datos.monitorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export CLUB_1_ID=${primero.id}`,
      `export CLUB_2_ID=${segundo.id}`,
      `export ACTIVIDAD_1_ID=${principal.id}`,
      `export ACTIVIDAD_2_ID=${secundaria.id}`,
      `export ACTIVIDAD_3_ID=${otra.id}`,
      `export MONITOR_1_ID=${diego.id}`,
      `export MONITOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { actividadId: 'ASC', monitorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

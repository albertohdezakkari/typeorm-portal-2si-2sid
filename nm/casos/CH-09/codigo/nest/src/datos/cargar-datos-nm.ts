import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Taller } from '../talleres/entities/taller.entity';
import { Reparacion } from '../reparaciones/entities/reparacion.entity';
import { Mecanico } from '../mecanicos/entities/mecanico.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const reparaciones = db.getRepository(Reparacion);
    const talleres = db.getRepository(Taller);
    const mecanicos = db.getRepository(Mecanico);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await reparaciones.findOneByOrFail({ nombre: 'Ajuste de frenos' });
    const secundaria = await reparaciones.findOneByOrFail({ nombre: 'Cambio de cadena' });
    const otra = await reparaciones.findOneByOrFail({ nombre: 'Ajuste de frenos · nuevo' });
    const primero = await talleres.findOneByOrFail({ nombre: 'Taller Norte' });
    const segundo = await talleres.findOneByOrFail({ nombre: 'Taller del Barrio' });

    const diego = await mecanicos.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await mecanicos.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await mecanicos.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await mecanicos.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { reparacionId: principal.id, mecanicoId: diego.id, rol: 'Diagnóstico' },
      { reparacionId: principal.id, mecanicoId: ana.id, rol: 'Reparación' },
      { reparacionId: secundaria.id, mecanicoId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ reparacionId: datos.reparacionId, mecanicoId: datos.mecanicoId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export TALLER_1_ID=${primero.id}`,
      `export TALLER_2_ID=${segundo.id}`,
      `export REPARACION_1_ID=${principal.id}`,
      `export REPARACION_2_ID=${secundaria.id}`,
      `export REPARACION_3_ID=${otra.id}`,
      `export MECANICO_1_ID=${diego.id}`,
      `export MECANICO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { reparacionId: 'ASC', mecanicoId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

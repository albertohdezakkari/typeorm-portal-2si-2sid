import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cooperativa } from '../cooperativas/entities/cooperativa.entity';
import { Lote } from '../lotes/entities/lote.entity';
import { Inspector } from '../inspectores/entities/inspector.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const lotes = db.getRepository(Lote);
    const cooperativas = db.getRepository(Cooperativa);
    const inspectores = db.getRepository(Inspector);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await lotes.findOneByOrFail({ nombre: 'Lote de manzanas' });
    const secundaria = await lotes.findOneByOrFail({ nombre: 'Lote de peras' });
    const otra = await lotes.findOneByOrFail({ nombre: 'Lote de manzanas · nuevo' });
    const primero = await cooperativas.findOneByOrFail({ nombre: 'Cooperativa Olivo' });
    const segundo = await cooperativas.findOneByOrFail({ nombre: 'Cooperativa Campo' });

    const diego = await inspectores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await inspectores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await inspectores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await inspectores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { loteId: principal.id, inspectorId: diego.id, rol: 'Control de calidad' },
      { loteId: principal.id, inspectorId: ana.id, rol: 'Trazabilidad' },
      { loteId: secundaria.id, inspectorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ loteId: datos.loteId, inspectorId: datos.inspectorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export COOPERATIVA_1_ID=${primero.id}`,
      `export COOPERATIVA_2_ID=${segundo.id}`,
      `export LOTE_1_ID=${principal.id}`,
      `export LOTE_2_ID=${secundaria.id}`,
      `export LOTE_3_ID=${otra.id}`,
      `export INSPECTOR_1_ID=${diego.id}`,
      `export INSPECTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { loteId: 'ASC', inspectorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

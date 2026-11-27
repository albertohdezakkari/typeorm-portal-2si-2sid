import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Agencia } from '../agencias/entities/agencia.entity';
import { Excursion } from '../excursiones/entities/excursion.entity';
import { Guia } from '../guias/entities/guia.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const excursiones = db.getRepository(Excursion);
    const agencias = db.getRepository(Agencia);
    const guias = db.getRepository(Guia);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await excursiones.findOneByOrFail({ nombre: 'Ruta del bosque' });
    const secundaria = await excursiones.findOneByOrFail({ nombre: 'Visita al castillo' });
    const otra = await excursiones.findOneByOrFail({ nombre: 'Ruta del bosque · nuevo' });
    const primero = await agencias.findOneByOrFail({ nombre: 'Agencia Horizonte' });
    const segundo = await agencias.findOneByOrFail({ nombre: 'Agencia Camino' });

    const diego = await guias.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await guias.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await guias.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await guias.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { excursionId: principal.id, guiaId: diego.id, rol: 'Guía de ruta' },
      { excursionId: principal.id, guiaId: ana.id, rol: 'Apoyo logístico' },
      { excursionId: secundaria.id, guiaId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ excursionId: datos.excursionId, guiaId: datos.guiaId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export AGENCIA_1_ID=${primero.id}`,
      `export AGENCIA_2_ID=${segundo.id}`,
      `export EXCURSION_1_ID=${principal.id}`,
      `export EXCURSION_2_ID=${secundaria.id}`,
      `export EXCURSION_3_ID=${otra.id}`,
      `export GUIA_1_ID=${diego.id}`,
      `export GUIA_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { excursionId: 'ASC', guiaId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

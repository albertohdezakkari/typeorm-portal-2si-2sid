import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Vivero } from '../viveros/entities/vivero.entity';
import { Planta } from '../plantas/entities/planta.entity';
import { Jardinero } from '../jardineros/entities/jardinero.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const plantas = db.getRepository(Planta);
    const viveros = db.getRepository(Vivero);
    const jardineros = db.getRepository(Jardinero);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await plantas.findOneByOrFail({ nombre: 'Lavanda' });
    const secundaria = await plantas.findOneByOrFail({ nombre: 'Romero' });
    const otra = await plantas.findOneByOrFail({ nombre: 'Lavanda · nuevo' });
    const primero = await viveros.findOneByOrFail({ nombre: 'Vivero Raíz' });
    const segundo = await viveros.findOneByOrFail({ nombre: 'Vivero Hoja' });

    const diego = await jardineros.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await jardineros.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await jardineros.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await jardineros.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { plantaId: principal.id, jardineroId: diego.id, rol: 'Riego' },
      { plantaId: principal.id, jardineroId: ana.id, rol: 'Tratamiento' },
      { plantaId: secundaria.id, jardineroId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ plantaId: datos.plantaId, jardineroId: datos.jardineroId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export VIVERO_1_ID=${primero.id}`,
      `export VIVERO_2_ID=${segundo.id}`,
      `export PLANTA_1_ID=${principal.id}`,
      `export PLANTA_2_ID=${secundaria.id}`,
      `export PLANTA_3_ID=${otra.id}`,
      `export JARDINERO_1_ID=${diego.id}`,
      `export JARDINERO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { plantaId: 'ASC', jardineroId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

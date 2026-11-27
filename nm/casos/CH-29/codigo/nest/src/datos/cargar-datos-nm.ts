import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Granja } from '../granjas/entities/granja.entity';
import { Cosecha } from '../cosechas/entities/cosecha.entity';
import { Agricultor } from '../agricultores/entities/agricultor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const cosechas = db.getRepository(Cosecha);
    const granjas = db.getRepository(Granja);
    const agricultores = db.getRepository(Agricultor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await cosechas.findOneByOrFail({ nombre: 'Cosecha de tomate' });
    const secundaria = await cosechas.findOneByOrFail({ nombre: 'Cosecha de calabaza' });
    const otra = await cosechas.findOneByOrFail({ nombre: 'Cosecha de tomate · nuevo' });
    const primero = await granjas.findOneByOrFail({ nombre: 'Granja del Sol' });
    const segundo = await granjas.findOneByOrFail({ nombre: 'Granja del Monte' });

    const diego = await agricultores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await agricultores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await agricultores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await agricultores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { cosechaId: principal.id, agricultorId: diego.id, rol: 'Recolección' },
      { cosechaId: principal.id, agricultorId: ana.id, rol: 'Clasificación' },
      { cosechaId: secundaria.id, agricultorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ cosechaId: datos.cosechaId, agricultorId: datos.agricultorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export GRANJA_1_ID=${primero.id}`,
      `export GRANJA_2_ID=${segundo.id}`,
      `export COSECHA_1_ID=${principal.id}`,
      `export COSECHA_2_ID=${secundaria.id}`,
      `export COSECHA_3_ID=${otra.id}`,
      `export AGRICULTOR_1_ID=${diego.id}`,
      `export AGRICULTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { cosechaId: 'ASC', agricultorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

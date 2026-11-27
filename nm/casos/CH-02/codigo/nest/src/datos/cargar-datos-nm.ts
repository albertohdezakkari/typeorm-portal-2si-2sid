import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Huerto } from '../huertos/entities/huerto.entity';
import { Parcela } from '../parcelas/entities/parcela.entity';
import { Cultivador } from '../cultivadores/entities/cultivador.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const parcelas = db.getRepository(Parcela);
    const huertos = db.getRepository(Huerto);
    const cultivadores = db.getRepository(Cultivador);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await parcelas.findOneByOrFail({ nombre: 'Parcela A' });
    const secundaria = await parcelas.findOneByOrFail({ nombre: 'Parcela B' });
    const otra = await parcelas.findOneByOrFail({ nombre: 'Parcela C' });
    const primero = await huertos.findOneByOrFail({ nombre: 'Huerto del Río' });
    const segundo = await huertos.findOneByOrFail({ nombre: 'Huerto del Parque' });

    const diego = await cultivadores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await cultivadores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await cultivadores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await cultivadores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { parcelaId: principal.id, cultivadorId: diego.id, rol: 'Siembra' },
      { parcelaId: principal.id, cultivadorId: ana.id, rol: 'Riego' },
      { parcelaId: secundaria.id, cultivadorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ parcelaId: datos.parcelaId, cultivadorId: datos.cultivadorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export HUERTO_1_ID=${primero.id}`,
      `export HUERTO_2_ID=${segundo.id}`,
      `export PARCELA_1_ID=${principal.id}`,
      `export PARCELA_2_ID=${secundaria.id}`,
      `export PARCELA_3_ID=${otra.id}`,
      `export CULTIVADOR_1_ID=${diego.id}`,
      `export CULTIVADOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { parcelaId: 'ASC', cultivadorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

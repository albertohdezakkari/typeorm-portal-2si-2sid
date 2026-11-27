import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Museo } from '../museos/entities/museo.entity';
import { Pieza } from '../piezas/entities/pieza.entity';
import { Restaurador } from '../restauradores/entities/restaurador.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const piezas = db.getRepository(Pieza);
    const museos = db.getRepository(Museo);
    const restauradores = db.getRepository(Restaurador);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await piezas.findOneByOrFail({ nombre: 'Vasija azul' });
    const secundaria = await piezas.findOneByOrFail({ nombre: 'Reloj de pared' });
    const otra = await piezas.findOneByOrFail({ nombre: 'Vasija azul · nuevo' });
    const primero = await museos.findOneByOrFail({ nombre: 'Museo del Barrio' });
    const segundo = await museos.findOneByOrFail({ nombre: 'Museo del Centro' });

    const diego = await restauradores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await restauradores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await restauradores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await restauradores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { piezaId: principal.id, restauradorId: diego.id, rol: 'Conservación' },
      { piezaId: principal.id, restauradorId: ana.id, rol: 'Documentación' },
      { piezaId: secundaria.id, restauradorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ piezaId: datos.piezaId, restauradorId: datos.restauradorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export MUSEO_1_ID=${primero.id}`,
      `export MUSEO_2_ID=${segundo.id}`,
      `export PIEZA_1_ID=${principal.id}`,
      `export PIEZA_2_ID=${secundaria.id}`,
      `export PIEZA_3_ID=${otra.id}`,
      `export RESTAURADOR_1_ID=${diego.id}`,
      `export RESTAURADOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { piezaId: 'ASC', restauradorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

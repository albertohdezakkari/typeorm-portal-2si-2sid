import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cafeteria } from '../cafeterias/entities/cafeteria.entity';
import { Comanda } from '../comandas/entities/comanda.entity';
import { Cocinero } from '../cocineros/entities/cocinero.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const comandas = db.getRepository(Comanda);
    const cafeterias = db.getRepository(Cafeteria);
    const cocineros = db.getRepository(Cocinero);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await comandas.findOneByOrFail({ nombre: 'Comanda C-01' });
    const secundaria = await comandas.findOneByOrFail({ nombre: 'Comanda C-02' });
    const otra = await comandas.findOneByOrFail({ nombre: 'Comanda C-01 · nuevo' });
    const primero = await cafeterias.findOneByOrFail({ nombre: 'Cafetería Plaza' });
    const segundo = await cafeterias.findOneByOrFail({ nombre: 'Cafetería Jardín' });

    const diego = await cocineros.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await cocineros.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await cocineros.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await cocineros.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { comandaId: principal.id, cocineroId: diego.id, rol: 'Preparación' },
      { comandaId: principal.id, cocineroId: ana.id, rol: 'Emplatado' },
      { comandaId: secundaria.id, cocineroId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ comandaId: datos.comandaId, cocineroId: datos.cocineroId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export CAFETERIA_1_ID=${primero.id}`,
      `export CAFETERIA_2_ID=${segundo.id}`,
      `export COMANDA_1_ID=${principal.id}`,
      `export COMANDA_2_ID=${secundaria.id}`,
      `export COMANDA_3_ID=${otra.id}`,
      `export COCINERO_1_ID=${diego.id}`,
      `export COCINERO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { comandaId: 'ASC', cocineroId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

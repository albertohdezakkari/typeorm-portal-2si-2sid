import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Emisora } from '../emisoras/entities/emisora.entity';
import { Programa } from '../programas/entities/programa.entity';
import { Locutor } from '../locutores/entities/locutor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const programas = db.getRepository(Programa);
    const emisoras = db.getRepository(Emisora);
    const locutores = db.getRepository(Locutor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await programas.findOneByOrFail({ nombre: 'Buenos días' });
    const secundaria = await programas.findOneByOrFail({ nombre: 'Tarde cultural' });
    const otra = await programas.findOneByOrFail({ nombre: 'Buenos días · nuevo' });
    const primero = await emisoras.findOneByOrFail({ nombre: 'Radio Horizonte' });
    const segundo = await emisoras.findOneByOrFail({ nombre: 'Radio Barrio' });

    const diego = await locutores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await locutores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await locutores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await locutores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { programaId: principal.id, locutorId: diego.id, rol: 'Presentación' },
      { programaId: principal.id, locutorId: ana.id, rol: 'Entrevistas' },
      { programaId: secundaria.id, locutorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ programaId: datos.programaId, locutorId: datos.locutorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export EMISORA_1_ID=${primero.id}`,
      `export EMISORA_2_ID=${segundo.id}`,
      `export PROGRAMA_1_ID=${principal.id}`,
      `export PROGRAMA_2_ID=${secundaria.id}`,
      `export PROGRAMA_3_ID=${otra.id}`,
      `export LOCUTOR_1_ID=${diego.id}`,
      `export LOCUTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { programaId: 'ASC', locutorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

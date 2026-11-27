import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Parque } from '../parques/entities/parque.entity';
import { Zona } from '../zonas/entities/zona.entity';
import { Jardinero } from '../jardineros/entities/jardinero.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const zonas = db.getRepository(Zona);
    const parques = db.getRepository(Parque);
    const jardineros = db.getRepository(Jardinero);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await zonas.findOneByOrFail({ nombre: 'Zona de juegos' });
    const secundaria = await zonas.findOneByOrFail({ nombre: 'Zona de picnic' });
    const otra = await zonas.findOneByOrFail({ nombre: 'Zona de juegos · nuevo' });
    const primero = await parques.findOneByOrFail({ nombre: 'Parque del Agua' });
    const segundo = await parques.findOneByOrFail({ nombre: 'Parque del Este' });

    const diego = await jardineros.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await jardineros.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await jardineros.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await jardineros.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { zonaId: principal.id, jardineroId: diego.id, rol: 'Riego' },
      { zonaId: principal.id, jardineroId: ana.id, rol: 'Poda' },
      { zonaId: secundaria.id, jardineroId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ zonaId: datos.zonaId, jardineroId: datos.jardineroId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export PARQUE_1_ID=${primero.id}`,
      `export PARQUE_2_ID=${segundo.id}`,
      `export ZONA_1_ID=${principal.id}`,
      `export ZONA_2_ID=${secundaria.id}`,
      `export ZONA_3_ID=${otra.id}`,
      `export JARDINERO_1_ID=${diego.id}`,
      `export JARDINERO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { zonaId: 'ASC', jardineroId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

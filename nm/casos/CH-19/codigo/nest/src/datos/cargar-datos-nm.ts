import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Puerto } from '../puertos/entities/puerto.entity';
import { Embarcacion } from '../embarcaciones/entities/embarcacion.entity';
import { Tripulante } from '../tripulantes/entities/tripulante.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const embarcaciones = db.getRepository(Embarcacion);
    const puertos = db.getRepository(Puerto);
    const tripulantes = db.getRepository(Tripulante);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await embarcaciones.findOneByOrFail({ nombre: 'Brisa' });
    const secundaria = await embarcaciones.findOneByOrFail({ nombre: 'Albatros' });
    const otra = await embarcaciones.findOneByOrFail({ nombre: 'Brisa · nuevo' });
    const primero = await puertos.findOneByOrFail({ nombre: 'Puerto del Mar' });
    const segundo = await puertos.findOneByOrFail({ nombre: 'Puerto del Faro' });

    const diego = await tripulantes.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await tripulantes.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await tripulantes.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await tripulantes.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { embarcacionId: principal.id, tripulanteId: diego.id, rol: 'Navegación' },
      { embarcacionId: principal.id, tripulanteId: ana.id, rol: 'Mantenimiento' },
      { embarcacionId: secundaria.id, tripulanteId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ embarcacionId: datos.embarcacionId, tripulanteId: datos.tripulanteId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export PUERTO_1_ID=${primero.id}`,
      `export PUERTO_2_ID=${segundo.id}`,
      `export EMBARCACION_1_ID=${principal.id}`,
      `export EMBARCACION_2_ID=${secundaria.id}`,
      `export EMBARCACION_3_ID=${otra.id}`,
      `export TRIPULANTE_1_ID=${diego.id}`,
      `export TRIPULANTE_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { embarcacionId: 'ASC', tripulanteId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

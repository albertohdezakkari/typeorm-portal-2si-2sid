import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Estudio } from '../estudios/entities/estudio.entity';
import { Escena } from '../escenas/entities/escena.entity';
import { Actor } from '../actores/entities/actor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const escenas = db.getRepository(Escena);
    const estudios = db.getRepository(Estudio);
    const actores = db.getRepository(Actor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await escenas.findOneByOrFail({ nombre: 'Escena de apertura' });
    const secundaria = await escenas.findOneByOrFail({ nombre: 'Escena del puente' });
    const otra = await escenas.findOneByOrFail({ nombre: 'Escena de apertura · nuevo' });
    const primero = await estudios.findOneByOrFail({ nombre: 'Estudio Prisma' });
    const segundo = await estudios.findOneByOrFail({ nombre: 'Estudio Lumen' });

    const diego = await actores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await actores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await actores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await actores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { escenaId: principal.id, actorId: diego.id, rol: 'Protagonista' },
      { escenaId: principal.id, actorId: ana.id, rol: 'Reparto' },
      { escenaId: secundaria.id, actorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ escenaId: datos.escenaId, actorId: datos.actorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export ESTUDIO_1_ID=${primero.id}`,
      `export ESTUDIO_2_ID=${segundo.id}`,
      `export ESCENA_1_ID=${principal.id}`,
      `export ESCENA_2_ID=${secundaria.id}`,
      `export ESCENA_3_ID=${otra.id}`,
      `export ACTOR_1_ID=${diego.id}`,
      `export ACTOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { escenaId: 'ASC', actorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

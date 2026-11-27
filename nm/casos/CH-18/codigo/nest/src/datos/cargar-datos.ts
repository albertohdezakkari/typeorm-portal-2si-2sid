import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Club } from '../clubes/entities/club.entity';
import { Actividad } from '../actividades/entities/actividad.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const clubes = db.getRepository(Club);
    const actividades = db.getRepository(Actividad);

    const primero = await clubes.findOneBy({ nombre: 'Club Encuentro' })
      ?? await clubes.save({ nombre: 'Club Encuentro' });
    const segundo = await clubes.findOneBy({ nombre: 'Club Horizonte' })
      ?? await clubes.save({ nombre: 'Club Horizonte' });

    const principal = await actividades.findOneBy({ nombre: 'Taller de fotografía' })
      ?? await actividades.save({ nombre: 'Taller de fotografía', plazas: 15, club: primero });
    const secundaria = await actividades.findOneBy({ nombre: 'Ruta urbana' })
      ?? await actividades.save({ nombre: 'Ruta urbana', plazas: 35, club: segundo });
    const otra = await actividades.findOneBy({ nombre: 'Taller de fotografía · nuevo' })
      ?? await actividades.save({ nombre: 'Taller de fotografía · nuevo', plazas: 65, club: primero });

    writeFileSync('ids-aula.env', [
      `export CLUB_1_ID=${primero.id}`,
      `export CLUB_2_ID=${segundo.id}`,
      `export ACTIVIDAD_1_ID=${principal.id}`,
      `export ACTIVIDAD_2_ID=${secundaria.id}`,
      `export ACTIVIDAD_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await actividades.find({ relations: { club: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

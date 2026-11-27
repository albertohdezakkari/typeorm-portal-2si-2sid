import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cine } from '../cines/entities/cine.entity';
import { Proyeccion } from '../proyecciones/entities/proyeccion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const cines = db.getRepository(Cine);
    const proyecciones = db.getRepository(Proyeccion);

    const primero = await cines.findOneBy({ nombre: 'Cine Alameda' })
      ?? await cines.save({ nombre: 'Cine Alameda' });
    const segundo = await cines.findOneBy({ nombre: 'Cine del Parque' })
      ?? await cines.save({ nombre: 'Cine del Parque' });

    const principal = await proyecciones.findOneBy({ pelicula: 'Viaje al norte' })
      ?? await proyecciones.save({ pelicula: 'Viaje al norte', duracionMinutos: 90, cine: primero });
    const secundaria = await proyecciones.findOneBy({ pelicula: 'La última estación' })
      ?? await proyecciones.save({ pelicula: 'La última estación', duracionMinutos: 125, cine: segundo });
    const otra = await proyecciones.findOneBy({ pelicula: 'Viaje al norte · nuevo' })
      ?? await proyecciones.save({ pelicula: 'Viaje al norte · nuevo', duracionMinutos: 305, cine: primero });

    writeFileSync('ids-aula.env', [
      `export CINE_1_ID=${primero.id}`,
      `export CINE_2_ID=${segundo.id}`,
      `export PROYECCION_1_ID=${principal.id}`,
      `export PROYECCION_2_ID=${secundaria.id}`,
      `export PROYECCION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await proyecciones.find({ relations: { cine: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Festival } from '../festivales/entities/festival.entity';
import { Actuacion } from '../actuaciones/entities/actuacion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const festivales = db.getRepository(Festival);
    const actuaciones = db.getRepository(Actuacion);

    const primero = await festivales.findOneBy({ nombre: 'Festival del Sol' })
      ?? await festivales.save({ nombre: 'Festival del Sol' });
    const segundo = await festivales.findOneBy({ nombre: 'Festival del Río' })
      ?? await festivales.save({ nombre: 'Festival del Río' });

    const principal = await actuaciones.findOneBy({ nombre: 'Concierto acústico' })
      ?? await actuaciones.save({ nombre: 'Concierto acústico', duracionMinutos: 25, festival: primero });
    const secundaria = await actuaciones.findOneBy({ nombre: 'Danza urbana' })
      ?? await actuaciones.save({ nombre: 'Danza urbana', duracionMinutos: 60, festival: segundo });
    const otra = await actuaciones.findOneBy({ nombre: 'Concierto acústico · nuevo' })
      ?? await actuaciones.save({ nombre: 'Concierto acústico · nuevo', duracionMinutos: 110, festival: primero });

    writeFileSync('ids-aula.env', [
      `export FESTIVAL_1_ID=${primero.id}`,
      `export FESTIVAL_2_ID=${segundo.id}`,
      `export ACTUACION_1_ID=${principal.id}`,
      `export ACTUACION_2_ID=${secundaria.id}`,
      `export ACTUACION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await actuaciones.find({ relations: { festival: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

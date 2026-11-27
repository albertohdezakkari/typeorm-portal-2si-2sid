import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Parque } from '../parques/entities/parque.entity';
import { Zona } from '../zonas/entities/zona.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const parques = db.getRepository(Parque);
    const zonas = db.getRepository(Zona);

    const primero = await parques.findOneBy({ nombre: 'Parque del Agua' })
      ?? await parques.save({ nombre: 'Parque del Agua' });
    const segundo = await parques.findOneBy({ nombre: 'Parque del Este' })
      ?? await parques.save({ nombre: 'Parque del Este' });

    const principal = await zonas.findOneBy({ nombre: 'Zona de juegos' })
      ?? await zonas.save({ nombre: 'Zona de juegos', capacidad: 30, parque: primero });
    const secundaria = await zonas.findOneBy({ nombre: 'Zona de picnic' })
      ?? await zonas.save({ nombre: 'Zona de picnic', capacidad: 80, parque: segundo });
    const otra = await zonas.findOneBy({ nombre: 'Zona de juegos · nuevo' })
      ?? await zonas.save({ nombre: 'Zona de juegos · nuevo', capacidad: 140, parque: primero });

    writeFileSync('ids-aula.env', [
      `export PARQUE_1_ID=${primero.id}`,
      `export PARQUE_2_ID=${segundo.id}`,
      `export ZONA_1_ID=${principal.id}`,
      `export ZONA_2_ID=${secundaria.id}`,
      `export ZONA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await zonas.find({ relations: { parque: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

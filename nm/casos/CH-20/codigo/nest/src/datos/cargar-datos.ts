import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Estacion } from '../estaciones/entities/estacion.entity';
import { Trayecto } from '../trayectos/entities/trayecto.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const estaciones = db.getRepository(Estacion);
    const trayectos = db.getRepository(Trayecto);

    const primero = await estaciones.findOneBy({ nombre: 'Estación Central' })
      ?? await estaciones.save({ nombre: 'Estación Central' });
    const segundo = await estaciones.findOneBy({ nombre: 'Estación Norte' })
      ?? await estaciones.save({ nombre: 'Estación Norte' });

    const principal = await trayectos.findOneBy({ nombre: 'Ruta del valle' })
      ?? await trayectos.save({ nombre: 'Ruta del valle', distanciaKm: 35, estacion: primero });
    const secundaria = await trayectos.findOneBy({ nombre: 'Ruta de la costa' })
      ?? await trayectos.save({ nombre: 'Ruta de la costa', distanciaKm: 180, estacion: segundo });
    const otra = await trayectos.findOneBy({ nombre: 'Ruta del valle · nuevo' })
      ?? await trayectos.save({ nombre: 'Ruta del valle · nuevo', distanciaKm: 250, estacion: primero });

    writeFileSync('ids-aula.env', [
      `export ESTACION_1_ID=${primero.id}`,
      `export ESTACION_2_ID=${segundo.id}`,
      `export TRAYECTO_1_ID=${principal.id}`,
      `export TRAYECTO_2_ID=${secundaria.id}`,
      `export TRAYECTO_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await trayectos.find({ relations: { estacion: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

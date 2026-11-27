import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Gimnasio } from '../gimnasios/entities/gimnasio.entity';
import { Sesion } from '../sesiones/entities/sesion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const gimnasios = db.getRepository(Gimnasio);
    const sesiones = db.getRepository(Sesion);

    const primero = await gimnasios.findOneBy({ nombre: 'Gimnasio Norte' })
      ?? await gimnasios.save({ nombre: 'Gimnasio Norte' });
    const segundo = await gimnasios.findOneBy({ nombre: 'Gimnasio Centro' })
      ?? await gimnasios.save({ nombre: 'Gimnasio Centro' });

    const principal = await sesiones.findOneBy({ nombre: 'Pilates inicial' })
      ?? await sesiones.save({ nombre: 'Pilates inicial', plazas: 10, gimnasio: primero });
    const secundaria = await sesiones.findOneBy({ nombre: 'Entrenamiento funcional' })
      ?? await sesiones.save({ nombre: 'Entrenamiento funcional', plazas: 24, gimnasio: segundo });
    const otra = await sesiones.findOneBy({ nombre: 'Pilates inicial · nuevo' })
      ?? await sesiones.save({ nombre: 'Pilates inicial · nuevo', plazas: 44, gimnasio: primero });

    writeFileSync('ids-aula.env', [
      `export GIMNASIO_1_ID=${primero.id}`,
      `export GIMNASIO_2_ID=${segundo.id}`,
      `export SESION_1_ID=${principal.id}`,
      `export SESION_2_ID=${secundaria.id}`,
      `export SESION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await sesiones.find({ relations: { gimnasio: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

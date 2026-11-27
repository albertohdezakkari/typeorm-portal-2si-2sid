import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Puerto } from '../puertos/entities/puerto.entity';
import { Embarcacion } from '../embarcaciones/entities/embarcacion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const puertos = db.getRepository(Puerto);
    const embarcaciones = db.getRepository(Embarcacion);

    const primero = await puertos.findOneBy({ nombre: 'Puerto del Mar' })
      ?? await puertos.save({ nombre: 'Puerto del Mar' });
    const segundo = await puertos.findOneBy({ nombre: 'Puerto del Faro' })
      ?? await puertos.save({ nombre: 'Puerto del Faro' });

    const principal = await embarcaciones.findOneBy({ nombre: 'Brisa' })
      ?? await embarcaciones.save({ nombre: 'Brisa', esloraMetros: 6, puerto: primero });
    const secundaria = await embarcaciones.findOneBy({ nombre: 'Albatros' })
      ?? await embarcaciones.save({ nombre: 'Albatros', esloraMetros: 14, puerto: segundo });
    const otra = await embarcaciones.findOneBy({ nombre: 'Brisa · nuevo' })
      ?? await embarcaciones.save({ nombre: 'Brisa · nuevo', esloraMetros: 26, puerto: primero });

    writeFileSync('ids-aula.env', [
      `export PUERTO_1_ID=${primero.id}`,
      `export PUERTO_2_ID=${segundo.id}`,
      `export EMBARCACION_1_ID=${principal.id}`,
      `export EMBARCACION_2_ID=${secundaria.id}`,
      `export EMBARCACION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await embarcaciones.find({ relations: { puerto: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Refugio } from '../refugios/entities/refugio.entity';
import { Animal } from '../animales/entities/animal.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const refugios = db.getRepository(Refugio);
    const animales = db.getRepository(Animal);

    const primero = await refugios.findOneBy({ nombre: 'Refugio Norte' })
      ?? await refugios.save({ nombre: 'Refugio Norte' });
    const segundo = await refugios.findOneBy({ nombre: 'Refugio Sur' })
      ?? await refugios.save({ nombre: 'Refugio Sur' });

    const principal = await animales.findOneBy({ nombre: 'Nala' })
      ?? await animales.save({ nombre: 'Nala', edadMeses: 8, refugio: primero });
    const secundaria = await animales.findOneBy({ nombre: 'Bruno' })
      ?? await animales.save({ nombre: 'Bruno', edadMeses: 24, refugio: segundo });
    const otra = await animales.findOneBy({ nombre: 'Nala · nuevo' })
      ?? await animales.save({ nombre: 'Nala · nuevo', edadMeses: 40, refugio: primero });

    writeFileSync('ids-aula.env', [
      `export REFUGIO_1_ID=${primero.id}`,
      `export REFUGIO_2_ID=${segundo.id}`,
      `export ANIMAL_1_ID=${principal.id}`,
      `export ANIMAL_2_ID=${secundaria.id}`,
      `export ANIMAL_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await animales.find({ relations: { refugio: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

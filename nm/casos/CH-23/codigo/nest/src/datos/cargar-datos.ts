import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cafeteria } from '../cafeterias/entities/cafeteria.entity';
import { Comanda } from '../comandas/entities/comanda.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const cafeterias = db.getRepository(Cafeteria);
    const comandas = db.getRepository(Comanda);

    const primero = await cafeterias.findOneBy({ nombre: 'Cafetería Plaza' })
      ?? await cafeterias.save({ nombre: 'Cafetería Plaza' });
    const segundo = await cafeterias.findOneBy({ nombre: 'Cafetería Jardín' })
      ?? await cafeterias.save({ nombre: 'Cafetería Jardín' });

    const principal = await comandas.findOneBy({ nombre: 'Comanda C-01' })
      ?? await comandas.save({ nombre: 'Comanda C-01', importeCentimos: 450, cafeteria: primero });
    const secundaria = await comandas.findOneBy({ nombre: 'Comanda C-02' })
      ?? await comandas.save({ nombre: 'Comanda C-02', importeCentimos: 1250, cafeteria: segundo });
    const otra = await comandas.findOneBy({ nombre: 'Comanda C-01 · nuevo' })
      ?? await comandas.save({ nombre: 'Comanda C-01 · nuevo', importeCentimos: 2150, cafeteria: primero });

    writeFileSync('ids-aula.env', [
      `export CAFETERIA_1_ID=${primero.id}`,
      `export CAFETERIA_2_ID=${segundo.id}`,
      `export COMANDA_1_ID=${principal.id}`,
      `export COMANDA_2_ID=${secundaria.id}`,
      `export COMANDA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await comandas.find({ relations: { cafeteria: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

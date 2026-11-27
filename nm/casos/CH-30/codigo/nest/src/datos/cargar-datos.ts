import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Teatro } from '../teatros/entities/teatro.entity';
import { Funcion } from '../funciones/entities/funcion.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const teatros = db.getRepository(Teatro);
    const funciones = db.getRepository(Funcion);

    const primero = await teatros.findOneBy({ nombre: 'Teatro Aurora' })
      ?? await teatros.save({ nombre: 'Teatro Aurora' });
    const segundo = await teatros.findOneBy({ nombre: 'Teatro del Barrio' })
      ?? await teatros.save({ nombre: 'Teatro del Barrio' });

    const principal = await funciones.findOneBy({ nombre: 'La puerta azul' })
      ?? await funciones.save({ nombre: 'La puerta azul', aforo: 100, teatro: primero });
    const secundaria = await funciones.findOneBy({ nombre: 'Historias del andén' })
      ?? await funciones.save({ nombre: 'Historias del andén', aforo: 250, teatro: segundo });
    const otra = await funciones.findOneBy({ nombre: 'La puerta azul · nuevo' })
      ?? await funciones.save({ nombre: 'La puerta azul · nuevo', aforo: 450, teatro: primero });

    writeFileSync('ids-aula.env', [
      `export TEATRO_1_ID=${primero.id}`,
      `export TEATRO_2_ID=${segundo.id}`,
      `export FUNCION_1_ID=${principal.id}`,
      `export FUNCION_2_ID=${secundaria.id}`,
      `export FUNCION_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await funciones.find({ relations: { teatro: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

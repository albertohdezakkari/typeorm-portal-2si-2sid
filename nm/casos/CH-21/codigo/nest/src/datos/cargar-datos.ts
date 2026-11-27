import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import { Muestra } from '../muestras/entities/muestra.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const laboratorios = db.getRepository(Laboratorio);
    const muestras = db.getRepository(Muestra);

    const primero = await laboratorios.findOneBy({ nombre: 'Laboratorio Azul' })
      ?? await laboratorios.save({ nombre: 'Laboratorio Azul' });
    const segundo = await laboratorios.findOneBy({ nombre: 'Laboratorio Verde' })
      ?? await laboratorios.save({ nombre: 'Laboratorio Verde' });

    const principal = await muestras.findOneBy({ nombre: 'Muestra M-01' })
      ?? await muestras.save({ nombre: 'Muestra M-01', cantidadMl: 15, laboratorio: primero });
    const secundaria = await muestras.findOneBy({ nombre: 'Muestra M-02' })
      ?? await muestras.save({ nombre: 'Muestra M-02', cantidadMl: 60, laboratorio: segundo });
    const otra = await muestras.findOneBy({ nombre: 'Muestra M-01 · nuevo' })
      ?? await muestras.save({ nombre: 'Muestra M-01 · nuevo', cantidadMl: 90, laboratorio: primero });

    writeFileSync('ids-aula.env', [
      `export LABORATORIO_1_ID=${primero.id}`,
      `export LABORATORIO_2_ID=${segundo.id}`,
      `export MUESTRA_1_ID=${principal.id}`,
      `export MUESTRA_2_ID=${secundaria.id}`,
      `export MUESTRA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await muestras.find({ relations: { laboratorio: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

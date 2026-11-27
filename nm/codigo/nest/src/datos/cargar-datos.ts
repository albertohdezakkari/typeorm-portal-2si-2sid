import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from '../obras/entities/obra.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const ayuntamientos = db.getRepository(Ayuntamiento);
    const obras = db.getRepository(Obra);

    const primero = await ayuntamientos.findOneBy({ nombre: 'Ayuntamiento del Río' })
      ?? await ayuntamientos.save({ nombre: 'Ayuntamiento del Río' });
    const segundo = await ayuntamientos.findOneBy({ nombre: 'Ayuntamiento del Valle' })
      ?? await ayuntamientos.save({ nombre: 'Ayuntamiento del Valle' });

    const principal = await obras.findOneBy({ nombre: 'Mejora de acera' })
      ?? await obras.save({ nombre: 'Mejora de acera', presupuestoEuros: 3000, ayuntamiento: primero });
    const secundaria = await obras.findOneBy({ nombre: 'Zona de sombra' })
      ?? await obras.save({ nombre: 'Zona de sombra', presupuestoEuros: 12000, ayuntamiento: segundo });
    const otra = await obras.findOneBy({ nombre: 'Mejora de acera · nuevo' })
      ?? await obras.save({ nombre: 'Mejora de acera · nuevo', presupuestoEuros: 18000, ayuntamiento: primero });

    writeFileSync('ids-aula.env', [
      `export AYUNTAMIENTO_1_ID=${primero.id}`,
      `export AYUNTAMIENTO_2_ID=${segundo.id}`,
      `export OBRA_1_ID=${principal.id}`,
      `export OBRA_2_ID=${secundaria.id}`,
      `export OBRA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await obras.find({ relations: { ayuntamiento: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

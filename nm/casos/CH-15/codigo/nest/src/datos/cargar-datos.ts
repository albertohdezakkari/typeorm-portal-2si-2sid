import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Empresa } from '../empresas/entities/empresa.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const empresas = db.getRepository(Empresa);
    const proyectos = db.getRepository(Proyecto);

    const primero = await empresas.findOneBy({ nombre: 'Empresa Brújula' })
      ?? await empresas.save({ nombre: 'Empresa Brújula' });
    const segundo = await empresas.findOneBy({ nombre: 'Empresa Delta' })
      ?? await empresas.save({ nombre: 'Empresa Delta' });

    const principal = await proyectos.findOneBy({ nombre: 'Portal de reservas' })
      ?? await proyectos.save({ nombre: 'Portal de reservas', horasEstimadas: 40, empresa: primero });
    const secundaria = await proyectos.findOneBy({ nombre: 'Catálogo interno' })
      ?? await proyectos.save({ nombre: 'Catálogo interno', horasEstimadas: 120, empresa: segundo });
    const otra = await proyectos.findOneBy({ nombre: 'Portal de reservas · nuevo' })
      ?? await proyectos.save({ nombre: 'Portal de reservas · nuevo', horasEstimadas: 200, empresa: primero });

    writeFileSync('ids-aula.env', [
      `export EMPRESA_1_ID=${primero.id}`,
      `export EMPRESA_2_ID=${segundo.id}`,
      `export PROYECTO_1_ID=${principal.id}`,
      `export PROYECTO_2_ID=${secundaria.id}`,
      `export PROYECTO_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await proyectos.find({ relations: { empresa: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Cine } from '../cines/entities/cine.entity';
import { Proyeccion } from '../proyecciones/entities/proyeccion.entity';
import { Tecnico } from '../tecnicos/entities/tecnico.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const proyecciones = db.getRepository(Proyeccion);
    const cines = db.getRepository(Cine);
    const tecnicos = db.getRepository(Tecnico);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await proyecciones.findOneByOrFail({ pelicula: 'Viaje al norte' });
    const secundaria = await proyecciones.findOneByOrFail({ pelicula: 'La última estación' });
    const otra = await proyecciones.findOneByOrFail({ pelicula: 'Viaje al norte · nuevo' });
    const primero = await cines.findOneByOrFail({ nombre: 'Cine Alameda' });
    const segundo = await cines.findOneByOrFail({ nombre: 'Cine del Parque' });

    const diego = await tecnicos.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await tecnicos.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await tecnicos.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await tecnicos.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { proyeccionId: principal.id, tecnicoId: diego.id, rol: 'Imagen' },
      { proyeccionId: principal.id, tecnicoId: ana.id, rol: 'Sonido' },
      { proyeccionId: secundaria.id, tecnicoId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ proyeccionId: datos.proyeccionId, tecnicoId: datos.tecnicoId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export CINE_1_ID=${primero.id}`,
      `export CINE_2_ID=${segundo.id}`,
      `export PROYECCION_1_ID=${principal.id}`,
      `export PROYECCION_2_ID=${secundaria.id}`,
      `export PROYECCION_3_ID=${otra.id}`,
      `export TECNICO_1_ID=${diego.id}`,
      `export TECNICO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { proyeccionId: 'ASC', tecnicoId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

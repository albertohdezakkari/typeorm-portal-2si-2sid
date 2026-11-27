import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Festival } from '../festivales/entities/festival.entity';
import { Actuacion } from '../actuaciones/entities/actuacion.entity';
import { Artista } from '../artistas/entities/artista.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const actuaciones = db.getRepository(Actuacion);
    const festivales = db.getRepository(Festival);
    const artistas = db.getRepository(Artista);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await actuaciones.findOneByOrFail({ nombre: 'Concierto acústico' });
    const secundaria = await actuaciones.findOneByOrFail({ nombre: 'Danza urbana' });
    const otra = await actuaciones.findOneByOrFail({ nombre: 'Concierto acústico · nuevo' });
    const primero = await festivales.findOneByOrFail({ nombre: 'Festival del Sol' });
    const segundo = await festivales.findOneByOrFail({ nombre: 'Festival del Río' });

    const diego = await artistas.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await artistas.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await artistas.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await artistas.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { actuacionId: principal.id, artistaId: diego.id, rol: 'Interpretación' },
      { actuacionId: principal.id, artistaId: ana.id, rol: 'Dirección artística' },
      { actuacionId: secundaria.id, artistaId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ actuacionId: datos.actuacionId, artistaId: datos.artistaId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export FESTIVAL_1_ID=${primero.id}`,
      `export FESTIVAL_2_ID=${segundo.id}`,
      `export ACTUACION_1_ID=${principal.id}`,
      `export ACTUACION_2_ID=${secundaria.id}`,
      `export ACTUACION_3_ID=${otra.id}`,
      `export ARTISTA_1_ID=${diego.id}`,
      `export ARTISTA_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { actuacionId: 'ASC', artistaId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Ayuntamiento } from '../ayuntamientos/entities/ayuntamiento.entity';
import { Obra } from '../obras/entities/obra.entity';
import { Profesional } from '../profesionales/entities/profesional.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const obras = db.getRepository(Obra);
    const ayuntamientos = db.getRepository(Ayuntamiento);
    const profesionales = db.getRepository(Profesional);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await obras.findOneByOrFail({ nombre: 'Mejora de acera' });
    const secundaria = await obras.findOneByOrFail({ nombre: 'Zona de sombra' });
    const otra = await obras.findOneByOrFail({ nombre: 'Mejora de acera · nuevo' });
    const primero = await ayuntamientos.findOneByOrFail({ nombre: 'Ayuntamiento del Río' });
    const segundo = await ayuntamientos.findOneByOrFail({ nombre: 'Ayuntamiento del Valle' });

    const diego = await profesionales.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await profesionales.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await profesionales.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await profesionales.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { obraId: principal.id, profesionalId: diego.id, rol: 'Electricista' },
      { obraId: principal.id, profesionalId: ana.id, rol: 'Arquitecta' },
      { obraId: secundaria.id, profesionalId: diego.id, rol: 'Coordinador' }
    ]) {
      const existente = await asignaciones.findOneBy({ obraId: datos.obraId, profesionalId: datos.profesionalId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export AYUNTAMIENTO_1_ID=${primero.id}`,
      `export AYUNTAMIENTO_2_ID=${segundo.id}`,
      `export OBRA_1_ID=${principal.id}`,
      `export OBRA_2_ID=${secundaria.id}`,
      `export OBRA_3_ID=${otra.id}`,
      `export PROFESIONAL_1_ID=${diego.id}`,
      `export PROFESIONAL_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { obraId: 'ASC', profesionalId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

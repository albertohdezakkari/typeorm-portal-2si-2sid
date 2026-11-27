import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Escuela } from '../escuelas/entities/escuela.entity';
import { Aula } from '../aulas/entities/aula.entity';
import { Docente } from '../docentes/entities/docente.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const aulas = db.getRepository(Aula);
    const escuelas = db.getRepository(Escuela);
    const docentes = db.getRepository(Docente);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await aulas.findOneByOrFail({ nombre: 'Aula Olmo' });
    const secundaria = await aulas.findOneByOrFail({ nombre: 'Aula Pino' });
    const otra = await aulas.findOneByOrFail({ nombre: 'Aula Olmo · nuevo' });
    const primero = await escuelas.findOneByOrFail({ nombre: 'Escuela Puente' });
    const segundo = await escuelas.findOneByOrFail({ nombre: 'Escuela Encuentro' });

    const diego = await docentes.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await docentes.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await docentes.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await docentes.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { aulaId: principal.id, docenteId: diego.id, rol: 'Docencia' },
      { aulaId: principal.id, docenteId: ana.id, rol: 'Apoyo' },
      { aulaId: secundaria.id, docenteId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ aulaId: datos.aulaId, docenteId: datos.docenteId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export ESCUELA_1_ID=${primero.id}`,
      `export ESCUELA_2_ID=${segundo.id}`,
      `export AULA_1_ID=${principal.id}`,
      `export AULA_2_ID=${secundaria.id}`,
      `export AULA_3_ID=${otra.id}`,
      `export DOCENTE_1_ID=${diego.id}`,
      `export DOCENTE_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { aulaId: 'ASC', docenteId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

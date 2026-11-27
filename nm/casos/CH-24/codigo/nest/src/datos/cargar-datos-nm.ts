import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Complejo } from '../complejos/entities/complejo.entity';
import { Pista } from '../pistas/entities/pista.entity';
import { Entrenador } from '../entrenadores/entities/entrenador.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const pistas = db.getRepository(Pista);
    const complejos = db.getRepository(Complejo);
    const entrenadores = db.getRepository(Entrenador);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await pistas.findOneByOrFail({ nombre: 'Pista cubierta' });
    const secundaria = await pistas.findOneByOrFail({ nombre: 'Pista exterior' });
    const otra = await pistas.findOneByOrFail({ nombre: 'Pista cubierta · nuevo' });
    const primero = await complejos.findOneByOrFail({ nombre: 'Complejo Municipal' });
    const segundo = await complejos.findOneByOrFail({ nombre: 'Complejo del Barrio' });

    const diego = await entrenadores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await entrenadores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await entrenadores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await entrenadores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { pistaId: principal.id, entrenadorId: diego.id, rol: 'Entrenamiento' },
      { pistaId: principal.id, entrenadorId: ana.id, rol: 'Supervisión' },
      { pistaId: secundaria.id, entrenadorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ pistaId: datos.pistaId, entrenadorId: datos.entrenadorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export COMPLEJO_1_ID=${primero.id}`,
      `export COMPLEJO_2_ID=${segundo.id}`,
      `export PISTA_1_ID=${principal.id}`,
      `export PISTA_2_ID=${secundaria.id}`,
      `export PISTA_3_ID=${otra.id}`,
      `export ENTRENADOR_1_ID=${diego.id}`,
      `export ENTRENADOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { pistaId: 'ASC', entrenadorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Laboratorio } from '../laboratorios/entities/laboratorio.entity';
import { Muestra } from '../muestras/entities/muestra.entity';
import { Analista } from '../analistas/entities/analista.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const muestras = db.getRepository(Muestra);
    const laboratorios = db.getRepository(Laboratorio);
    const analistas = db.getRepository(Analista);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await muestras.findOneByOrFail({ nombre: 'Muestra M-01' });
    const secundaria = await muestras.findOneByOrFail({ nombre: 'Muestra M-02' });
    const otra = await muestras.findOneByOrFail({ nombre: 'Muestra M-01 · nuevo' });
    const primero = await laboratorios.findOneByOrFail({ nombre: 'Laboratorio Azul' });
    const segundo = await laboratorios.findOneByOrFail({ nombre: 'Laboratorio Verde' });

    const diego = await analistas.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await analistas.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await analistas.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await analistas.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { muestraId: principal.id, analistaId: diego.id, rol: 'Análisis' },
      { muestraId: principal.id, analistaId: ana.id, rol: 'Verificación' },
      { muestraId: secundaria.id, analistaId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ muestraId: datos.muestraId, analistaId: datos.analistaId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export LABORATORIO_1_ID=${primero.id}`,
      `export LABORATORIO_2_ID=${segundo.id}`,
      `export MUESTRA_1_ID=${principal.id}`,
      `export MUESTRA_2_ID=${secundaria.id}`,
      `export MUESTRA_3_ID=${otra.id}`,
      `export ANALISTA_1_ID=${diego.id}`,
      `export ANALISTA_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { muestraId: 'ASC', analistaId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Urbanizacion } from '../urbanizaciones/entities/urbanizacion.entity';
import { Plaza } from '../plazas/entities/plaza.entity';
import { Tecnico } from '../tecnicos/entities/tecnico.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const plazas = db.getRepository(Plaza);
    const urbanizaciones = db.getRepository(Urbanizacion);
    const tecnicos = db.getRepository(Tecnico);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await plazas.findOneByOrFail({ nombre: 'Plaza P-01' });
    const secundaria = await plazas.findOneByOrFail({ nombre: 'Plaza P-02' });
    const otra = await plazas.findOneByOrFail({ nombre: 'Plaza P-01 · nuevo' });
    const primero = await urbanizaciones.findOneByOrFail({ nombre: 'Urbanización Jardín' });
    const segundo = await urbanizaciones.findOneByOrFail({ nombre: 'Urbanización Lago' });

    const diego = await tecnicos.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await tecnicos.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await tecnicos.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await tecnicos.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { plazaId: principal.id, tecnicoId: diego.id, rol: 'Inspección' },
      { plazaId: principal.id, tecnicoId: ana.id, rol: 'Mantenimiento' },
      { plazaId: secundaria.id, tecnicoId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ plazaId: datos.plazaId, tecnicoId: datos.tecnicoId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export URBANIZACION_1_ID=${primero.id}`,
      `export URBANIZACION_2_ID=${segundo.id}`,
      `export PLAZA_1_ID=${principal.id}`,
      `export PLAZA_2_ID=${secundaria.id}`,
      `export PLAZA_3_ID=${otra.id}`,
      `export TECNICO_1_ID=${diego.id}`,
      `export TECNICO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { plazaId: 'ASC', tecnicoId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

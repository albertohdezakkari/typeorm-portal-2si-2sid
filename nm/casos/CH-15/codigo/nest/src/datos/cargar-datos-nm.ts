import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Empresa } from '../empresas/entities/empresa.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { Colaborador } from '../colaboradores/entities/colaborador.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const proyectos = db.getRepository(Proyecto);
    const empresas = db.getRepository(Empresa);
    const colaboradores = db.getRepository(Colaborador);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await proyectos.findOneByOrFail({ nombre: 'Portal de reservas' });
    const secundaria = await proyectos.findOneByOrFail({ nombre: 'Catálogo interno' });
    const otra = await proyectos.findOneByOrFail({ nombre: 'Portal de reservas · nuevo' });
    const primero = await empresas.findOneByOrFail({ nombre: 'Empresa Brújula' });
    const segundo = await empresas.findOneByOrFail({ nombre: 'Empresa Delta' });

    const diego = await colaboradores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await colaboradores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await colaboradores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await colaboradores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { proyectoId: principal.id, colaboradorId: diego.id, rol: 'Desarrollo' },
      { proyectoId: principal.id, colaboradorId: ana.id, rol: 'Diseño' },
      { proyectoId: secundaria.id, colaboradorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ proyectoId: datos.proyectoId, colaboradorId: datos.colaboradorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export EMPRESA_1_ID=${primero.id}`,
      `export EMPRESA_2_ID=${segundo.id}`,
      `export PROYECTO_1_ID=${principal.id}`,
      `export PROYECTO_2_ID=${secundaria.id}`,
      `export PROYECTO_3_ID=${otra.id}`,
      `export COLABORADOR_1_ID=${diego.id}`,
      `export COLABORADOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { proyectoId: 'ASC', colaboradorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

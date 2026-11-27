import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Archivo } from '../archivos/entities/archivo.entity';
import { Documento } from '../documentos/entities/documento.entity';
import { Revisor } from '../revisores/entities/revisor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const documentos = db.getRepository(Documento);
    const archivos = db.getRepository(Archivo);
    const revisores = db.getRepository(Revisor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await documentos.findOneByOrFail({ nombre: 'Inventario antiguo' });
    const secundaria = await documentos.findOneByOrFail({ nombre: 'Memoria del barrio' });
    const otra = await documentos.findOneByOrFail({ nombre: 'Inventario antiguo · nuevo' });
    const primero = await archivos.findOneByOrFail({ nombre: 'Archivo Municipal' });
    const segundo = await archivos.findOneByOrFail({ nombre: 'Archivo del Centro' });

    const diego = await revisores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await revisores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await revisores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await revisores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { documentoId: principal.id, revisorId: diego.id, rol: 'Catalogación' },
      { documentoId: principal.id, revisorId: ana.id, rol: 'Verificación' },
      { documentoId: secundaria.id, revisorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ documentoId: datos.documentoId, revisorId: datos.revisorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export ARCHIVO_1_ID=${primero.id}`,
      `export ARCHIVO_2_ID=${segundo.id}`,
      `export DOCUMENTO_1_ID=${principal.id}`,
      `export DOCUMENTO_2_ID=${secundaria.id}`,
      `export DOCUMENTO_3_ID=${otra.id}`,
      `export REVISOR_1_ID=${diego.id}`,
      `export REVISOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { documentoId: 'ASC', revisorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

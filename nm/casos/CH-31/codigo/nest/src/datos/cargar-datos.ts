import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Archivo } from '../archivos/entities/archivo.entity';
import { Documento } from '../documentos/entities/documento.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const archivos = db.getRepository(Archivo);
    const documentos = db.getRepository(Documento);

    const primero = await archivos.findOneBy({ nombre: 'Archivo Municipal' })
      ?? await archivos.save({ nombre: 'Archivo Municipal' });
    const segundo = await archivos.findOneBy({ nombre: 'Archivo del Centro' })
      ?? await archivos.save({ nombre: 'Archivo del Centro' });

    const principal = await documentos.findOneBy({ nombre: 'Inventario antiguo' })
      ?? await documentos.save({ nombre: 'Inventario antiguo', paginas: 20, archivo: primero });
    const secundaria = await documentos.findOneBy({ nombre: 'Memoria del barrio' })
      ?? await documentos.save({ nombre: 'Memoria del barrio', paginas: 75, archivo: segundo });
    const otra = await documentos.findOneBy({ nombre: 'Inventario antiguo · nuevo' })
      ?? await documentos.save({ nombre: 'Inventario antiguo · nuevo', paginas: 115, archivo: primero });

    writeFileSync('ids-aula.env', [
      `export ARCHIVO_1_ID=${primero.id}`,
      `export ARCHIVO_2_ID=${segundo.id}`,
      `export DOCUMENTO_1_ID=${principal.id}`,
      `export DOCUMENTO_2_ID=${secundaria.id}`,
      `export DOCUMENTO_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await documentos.find({ relations: { archivo: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Panaderia } from '../panaderias/entities/panaderia.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Panadero } from '../panaderos/entities/panadero.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const productos = db.getRepository(Producto);
    const panaderias = db.getRepository(Panaderia);
    const panaderos = db.getRepository(Panadero);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await productos.findOneByOrFail({ nombre: 'Pan integral' });
    const secundaria = await productos.findOneByOrFail({ nombre: 'Caja de pastas' });
    const otra = await productos.findOneByOrFail({ nombre: 'Pan integral · nuevo' });
    const primero = await panaderias.findOneByOrFail({ nombre: 'Panadería Espiga' });
    const segundo = await panaderias.findOneByOrFail({ nombre: 'Panadería Trigo' });

    const diego = await panaderos.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await panaderos.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await panaderos.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await panaderos.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { productoId: principal.id, panaderoId: diego.id, rol: 'Elaboración' },
      { productoId: principal.id, panaderoId: ana.id, rol: 'Control de calidad' },
      { productoId: secundaria.id, panaderoId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ productoId: datos.productoId, panaderoId: datos.panaderoId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export PANADERIA_1_ID=${primero.id}`,
      `export PANADERIA_2_ID=${segundo.id}`,
      `export PRODUCTO_1_ID=${principal.id}`,
      `export PRODUCTO_2_ID=${secundaria.id}`,
      `export PRODUCTO_3_ID=${otra.id}`,
      `export PANADERO_1_ID=${diego.id}`,
      `export PANADERO_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { productoId: 'ASC', panaderoId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

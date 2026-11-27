import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Panaderia } from '../panaderias/entities/panaderia.entity';
import { Producto } from '../productos/entities/producto.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const panaderias = db.getRepository(Panaderia);
    const productos = db.getRepository(Producto);

    const primero = await panaderias.findOneBy({ nombre: 'Panadería Espiga' })
      ?? await panaderias.save({ nombre: 'Panadería Espiga' });
    const segundo = await panaderias.findOneBy({ nombre: 'Panadería Trigo' })
      ?? await panaderias.save({ nombre: 'Panadería Trigo' });

    const principal = await productos.findOneBy({ nombre: 'Pan integral' })
      ?? await productos.save({ nombre: 'Pan integral', precioCentimos: 180, panaderia: primero });
    const secundaria = await productos.findOneBy({ nombre: 'Caja de pastas' })
      ?? await productos.save({ nombre: 'Caja de pastas', precioCentimos: 650, panaderia: segundo });
    const otra = await productos.findOneBy({ nombre: 'Pan integral · nuevo' })
      ?? await productos.save({ nombre: 'Pan integral · nuevo', precioCentimos: 1010, panaderia: primero });

    writeFileSync('ids-aula.env', [
      `export PANADERIA_1_ID=${primero.id}`,
      `export PANADERIA_2_ID=${segundo.id}`,
      `export PRODUCTO_1_ID=${principal.id}`,
      `export PRODUCTO_2_ID=${secundaria.id}`,
      `export PRODUCTO_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await productos.find({ relations: { panaderia: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Tienda } from '../tiendas/entities/tienda.entity';
import { Articulo } from '../articulos/entities/articulo.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const tiendas = db.getRepository(Tienda);
    const articulos = db.getRepository(Articulo);

    const primero = await tiendas.findOneBy({ nombre: 'Tienda Esquina' })
      ?? await tiendas.save({ nombre: 'Tienda Esquina' });
    const segundo = await tiendas.findOneBy({ nombre: 'Tienda Centro' })
      ?? await tiendas.save({ nombre: 'Tienda Centro' });

    const principal = await articulos.findOneBy({ nombre: 'Cuaderno azul' })
      ?? await articulos.save({ nombre: 'Cuaderno azul', stock: 12, tienda: primero });
    const secundaria = await articulos.findOneBy({ nombre: 'Estuche verde' })
      ?? await articulos.save({ nombre: 'Estuche verde', stock: 60, tienda: segundo });
    const otra = await articulos.findOneBy({ nombre: 'Cuaderno azul · nuevo' })
      ?? await articulos.save({ nombre: 'Cuaderno azul · nuevo', stock: 84, tienda: primero });

    writeFileSync('ids-aula.env', [
      `export TIENDA_1_ID=${primero.id}`,
      `export TIENDA_2_ID=${segundo.id}`,
      `export ARTICULO_1_ID=${principal.id}`,
      `export ARTICULO_2_ID=${secundaria.id}`,
      `export ARTICULO_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await articulos.find({ relations: { tienda: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

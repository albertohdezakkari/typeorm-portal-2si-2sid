import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Tienda } from '../tiendas/entities/tienda.entity';
import { Articulo } from '../articulos/entities/articulo.entity';
import { Vendedor } from '../vendedores/entities/vendedor.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const articulos = db.getRepository(Articulo);
    const tiendas = db.getRepository(Tienda);
    const vendedores = db.getRepository(Vendedor);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await articulos.findOneByOrFail({ nombre: 'Cuaderno azul' });
    const secundaria = await articulos.findOneByOrFail({ nombre: 'Estuche verde' });
    const otra = await articulos.findOneByOrFail({ nombre: 'Cuaderno azul · nuevo' });
    const primero = await tiendas.findOneByOrFail({ nombre: 'Tienda Esquina' });
    const segundo = await tiendas.findOneByOrFail({ nombre: 'Tienda Centro' });

    const diego = await vendedores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await vendedores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await vendedores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await vendedores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { articuloId: principal.id, vendedorId: diego.id, rol: 'Venta' },
      { articuloId: principal.id, vendedorId: ana.id, rol: 'Asesoramiento' },
      { articuloId: secundaria.id, vendedorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ articuloId: datos.articuloId, vendedorId: datos.vendedorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export TIENDA_1_ID=${primero.id}`,
      `export TIENDA_2_ID=${segundo.id}`,
      `export ARTICULO_1_ID=${principal.id}`,
      `export ARTICULO_2_ID=${secundaria.id}`,
      `export ARTICULO_3_ID=${otra.id}`,
      `export VENDEDOR_1_ID=${diego.id}`,
      `export VENDEDOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { articuloId: 'ASC', vendedorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

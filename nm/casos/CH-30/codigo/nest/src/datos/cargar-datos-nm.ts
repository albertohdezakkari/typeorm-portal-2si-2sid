import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Teatro } from '../teatros/entities/teatro.entity';
import { Funcion } from '../funciones/entities/funcion.entity';
import { Interprete } from '../interpretes/entities/interprete.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const funciones = db.getRepository(Funcion);
    const teatros = db.getRepository(Teatro);
    const interpretes = db.getRepository(Interprete);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await funciones.findOneByOrFail({ nombre: 'La puerta azul' });
    const secundaria = await funciones.findOneByOrFail({ nombre: 'Historias del andén' });
    const otra = await funciones.findOneByOrFail({ nombre: 'La puerta azul · nuevo' });
    const primero = await teatros.findOneByOrFail({ nombre: 'Teatro Aurora' });
    const segundo = await teatros.findOneByOrFail({ nombre: 'Teatro del Barrio' });

    const diego = await interpretes.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await interpretes.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await interpretes.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await interpretes.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { funcionId: principal.id, interpreteId: diego.id, rol: 'Interpretación' },
      { funcionId: principal.id, interpreteId: ana.id, rol: 'Narración' },
      { funcionId: secundaria.id, interpreteId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ funcionId: datos.funcionId, interpreteId: datos.interpreteId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export TEATRO_1_ID=${primero.id}`,
      `export TEATRO_2_ID=${segundo.id}`,
      `export FUNCION_1_ID=${principal.id}`,
      `export FUNCION_2_ID=${secundaria.id}`,
      `export FUNCION_3_ID=${otra.id}`,
      `export INTERPRETE_1_ID=${diego.id}`,
      `export INTERPRETE_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { funcionId: 'ASC', interpreteId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

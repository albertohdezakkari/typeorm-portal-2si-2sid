import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Hotel } from '../hoteles/entities/hotel.entity';
import { Reserva } from '../reservas/entities/reserva.entity';
import { Huesped } from '../huespedes/entities/huesped.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const reservas = db.getRepository(Reserva);
    const hoteles = db.getRepository(Hotel);
    const huespedes = db.getRepository(Huesped);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await reservas.findOneByOrFail({ nombre: 'Reserva R-101' });
    const secundaria = await reservas.findOneByOrFail({ nombre: 'Reserva R-102' });
    const otra = await reservas.findOneByOrFail({ nombre: 'Reserva R-101 · nuevo' });
    const primero = await hoteles.findOneByOrFail({ nombre: 'Hotel Aurora' });
    const segundo = await hoteles.findOneByOrFail({ nombre: 'Hotel del Lago' });

    const diego = await huespedes.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await huespedes.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await huespedes.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await huespedes.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { reservaId: principal.id, huespedId: diego.id, rol: 'Titular' },
      { reservaId: principal.id, huespedId: ana.id, rol: 'Acompañante' },
      { reservaId: secundaria.id, huespedId: diego.id, rol: 'Responsable del grupo' }
    ]) {
      const existente = await asignaciones.findOneBy({ reservaId: datos.reservaId, huespedId: datos.huespedId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export HOTEL_1_ID=${primero.id}`,
      `export HOTEL_2_ID=${segundo.id}`,
      `export RESERVA_1_ID=${principal.id}`,
      `export RESERVA_2_ID=${secundaria.id}`,
      `export RESERVA_3_ID=${otra.id}`,
      `export HUESPED_1_ID=${diego.id}`,
      `export HUESPED_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { reservaId: 'ASC', huespedId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

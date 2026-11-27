import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Hotel } from '../hoteles/entities/hotel.entity';
import { Reserva } from '../reservas/entities/reserva.entity';

async function cargarDatos() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const hoteles = db.getRepository(Hotel);
    const reservas = db.getRepository(Reserva);

    const primero = await hoteles.findOneBy({ nombre: 'Hotel Aurora' })
      ?? await hoteles.save({ nombre: 'Hotel Aurora' });
    const segundo = await hoteles.findOneBy({ nombre: 'Hotel del Lago' })
      ?? await hoteles.save({ nombre: 'Hotel del Lago' });

    const principal = await reservas.findOneBy({ nombre: 'Reserva R-101' })
      ?? await reservas.save({ nombre: 'Reserva R-101', noches: 2, hotel: primero });
    const secundaria = await reservas.findOneBy({ nombre: 'Reserva R-102' })
      ?? await reservas.save({ nombre: 'Reserva R-102', noches: 5, hotel: segundo });
    const otra = await reservas.findOneBy({ nombre: 'Reserva R-101 · nuevo' })
      ?? await reservas.save({ nombre: 'Reserva R-101 · nuevo', noches: 9, hotel: primero });

    writeFileSync('ids-aula.env', [
      `export HOTEL_1_ID=${primero.id}`,
      `export HOTEL_2_ID=${segundo.id}`,
      `export RESERVA_1_ID=${principal.id}`,
      `export RESERVA_2_ID=${secundaria.id}`,
      `export RESERVA_3_ID=${otra.id}`
    ].join('\n') + '\n');
    console.table(await reservas.find({ relations: { hotel: true }, order: { id: 'ASC' } }));
    console.log('Datos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatos().catch(error => { console.error(error); process.exitCode = 1; });

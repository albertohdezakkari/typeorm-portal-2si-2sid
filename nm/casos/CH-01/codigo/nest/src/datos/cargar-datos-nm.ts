import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { writeFileSync } from 'node:fs';
import { AppModule } from '../app.module';
import { Refugio } from '../refugios/entities/refugio.entity';
import { Animal } from '../animales/entities/animal.entity';
import { Cuidador } from '../cuidadores/entities/cuidador.entity';
import { Asignacion } from '../asignaciones/entities/asignacion.entity';

async function cargarDatosNM() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: false });
  try {
    const db = app.get(DataSource);
    const animales = db.getRepository(Animal);
    const refugios = db.getRepository(Refugio);
    const cuidadores = db.getRepository(Cuidador);
    const asignaciones = db.getRepository(Asignacion);
    const principal = await animales.findOneByOrFail({ nombre: 'Nala' });
    const secundaria = await animales.findOneByOrFail({ nombre: 'Bruno' });
    const otra = await animales.findOneByOrFail({ nombre: 'Nala · nuevo' });
    const primero = await refugios.findOneByOrFail({ nombre: 'Refugio Norte' });
    const segundo = await refugios.findOneByOrFail({ nombre: 'Refugio Sur' });

    const diego = await cuidadores.findOneBy({ email: 'diego.ruiz@example.test' })
      ?? await cuidadores.save({ nombre: 'Diego', apellidos: 'Ruiz López', email: 'diego.ruiz@example.test' });
    const ana = await cuidadores.findOneBy({ email: 'ana.vidal@example.test' })
      ?? await cuidadores.save({ nombre: 'Ana', apellidos: 'Vidal Sanz', email: 'ana.vidal@example.test' });

    for (const datos of [
      { animalId: principal.id, cuidadorId: diego.id, rol: 'Alimentación' },
      { animalId: principal.id, cuidadorId: ana.id, rol: 'Seguimiento sanitario' },
      { animalId: secundaria.id, cuidadorId: diego.id, rol: 'Coordinación' }
    ]) {
      const existente = await asignaciones.findOneBy({ animalId: datos.animalId, cuidadorId: datos.cuidadorId });
      if (!existente) await asignaciones.save(datos);
    }

    writeFileSync('ids-aula.env', [
      `export REFUGIO_1_ID=${primero.id}`,
      `export REFUGIO_2_ID=${segundo.id}`,
      `export ANIMAL_1_ID=${principal.id}`,
      `export ANIMAL_2_ID=${secundaria.id}`,
      `export ANIMAL_3_ID=${otra.id}`,
      `export CUIDADOR_1_ID=${diego.id}`,
      `export CUIDADOR_2_ID=${ana.id}`
    ].join('\n') + '\n');
    console.table(await asignaciones.find({ order: { animalId: 'ASC', cuidadorId: 'ASC' } }));
    console.log('Vínculos preparados. Carga los IDs en esta terminal: . ./ids-aula.env');
  } finally {
    await app.close();
  }
}

cargarDatosNM().catch(error => { console.error(error); process.exitCode = 1; });

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muestra } from '../entities/muestra.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>
  ) {}

  crearMuestraRepository(nombre: string, cantidadMl: number, laboratorioId: number) {
    const muestra = this.muestras.create({
      nombre, cantidadMl, laboratorio: { id: laboratorioId }
    });
    return this.muestras.save(muestra);
  }

  listarMuestrasRepository() {
    return this.muestras.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

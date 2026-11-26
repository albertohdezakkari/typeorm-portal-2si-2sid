import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actuacion } from '../entities/actuacion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>
  ) {}

  crearActuacionRepository(nombre: string, duracionMinutos: number, festivalId: number) {
    const actuacion = this.actuaciones.create({
      nombre, duracionMinutos, festival: { id: festivalId }
    });
    return this.actuaciones.save(actuacion);
  }

  listarActuacionesRepository() {
    return this.actuaciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

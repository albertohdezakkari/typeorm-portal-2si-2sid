import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorTripulanteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorTripulanteRepository(tripulanteId: number) {
    return this.asignaciones.find({
      where: { tripulanteId },
      order: { embarcacionId: 'ASC' }
    });
  }
}

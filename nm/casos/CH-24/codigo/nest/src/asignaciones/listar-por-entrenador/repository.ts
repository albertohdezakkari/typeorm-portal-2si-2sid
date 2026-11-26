import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorEntrenadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorEntrenadorRepository(entrenadorId: number) {
    return this.asignaciones.find({
      where: { entrenadorId },
      order: { pistaId: 'ASC' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorCuidadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorCuidadorRepository(cuidadorId: number) {
    return this.asignaciones.find({
      where: { cuidadorId },
      order: { animalId: 'ASC' }
    });
  }
}

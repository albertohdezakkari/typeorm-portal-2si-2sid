import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorProfesionalRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorProfesionalRepository(profesionalId: number) {
    return this.asignaciones.find({
      where: { profesionalId },
      order: { obraId: 'ASC' }
    });
  }
}

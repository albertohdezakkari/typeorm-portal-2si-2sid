import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorProgramaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorProgramaRepository(programaId: number) {
    return this.asignaciones.find({
      where: { programaId },
      order: { locutorId: 'ASC' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorCosechaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorCosechaRepository(cosechaId: number) {
    return this.asignaciones.find({
      where: { cosechaId },
      order: { agricultorId: 'ASC' }
    });
  }
}

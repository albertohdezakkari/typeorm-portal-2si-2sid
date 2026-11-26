import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorPiezaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorPiezaRepository(piezaId: number) {
    return this.asignaciones.find({
      where: { piezaId },
      order: { restauradorId: 'ASC' }
    });
  }
}

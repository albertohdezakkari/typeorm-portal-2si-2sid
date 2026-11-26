import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorRestauradorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorRestauradorRepository(restauradorId: number) {
    return this.asignaciones.find({
      where: { restauradorId },
      order: { piezaId: 'ASC' }
    });
  }
}

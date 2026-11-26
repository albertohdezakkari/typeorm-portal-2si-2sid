import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorArticuloRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorArticuloRepository(articuloId: number) {
    return this.asignaciones.find({
      where: { articuloId },
      order: { vendedorId: 'ASC' }
    });
  }
}

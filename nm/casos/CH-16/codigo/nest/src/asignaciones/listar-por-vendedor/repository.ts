import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorVendedorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorVendedorRepository(vendedorId: number) {
    return this.asignaciones.find({
      where: { vendedorId },
      order: { articuloId: 'ASC' }
    });
  }
}

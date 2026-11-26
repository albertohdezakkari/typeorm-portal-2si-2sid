import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorParcelaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorParcelaRepository(parcelaId: number) {
    return this.asignaciones.find({
      where: { parcelaId },
      order: { cultivadorId: 'ASC' }
    });
  }
}

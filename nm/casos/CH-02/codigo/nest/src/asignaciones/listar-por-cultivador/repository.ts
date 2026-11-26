import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorCultivadorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorCultivadorRepository(cultivadorId: number) {
    return this.asignaciones.find({
      where: { cultivadorId },
      order: { parcelaId: 'ASC' }
    });
  }
}

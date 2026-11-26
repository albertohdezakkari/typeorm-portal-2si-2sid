import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorMuestraRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorMuestraRepository(muestraId: number) {
    return this.asignaciones.find({
      where: { muestraId },
      order: { analistaId: 'ASC' }
    });
  }
}

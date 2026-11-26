import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorInspectorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorInspectorRepository(inspectorId: number) {
    return this.asignaciones.find({
      where: { inspectorId },
      order: { loteId: 'ASC' }
    });
  }
}

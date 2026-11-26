import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorMonitorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorMonitorRepository(monitorId: number) {
    return this.asignaciones.find({
      where: { monitorId },
      order: { actividadId: 'ASC' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorTrayectoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorTrayectoRepository(trayectoId: number) {
    return this.asignaciones.find({
      where: { trayectoId },
      order: { conductorId: 'ASC' }
    });
  }
}

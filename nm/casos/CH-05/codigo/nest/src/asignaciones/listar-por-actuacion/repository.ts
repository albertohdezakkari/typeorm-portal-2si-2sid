import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorActuacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorActuacionRepository(actuacionId: number) {
    return this.asignaciones.find({
      where: { actuacionId },
      order: { artistaId: 'ASC' }
    });
  }
}

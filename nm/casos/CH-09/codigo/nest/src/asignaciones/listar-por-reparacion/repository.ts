import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorReparacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorReparacionRepository(reparacionId: number) {
    return this.asignaciones.find({
      where: { reparacionId },
      order: { mecanicoId: 'ASC' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorMecanicoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorMecanicoRepository(mecanicoId: number) {
    return this.asignaciones.find({
      where: { mecanicoId },
      order: { reparacionId: 'ASC' }
    });
  }
}

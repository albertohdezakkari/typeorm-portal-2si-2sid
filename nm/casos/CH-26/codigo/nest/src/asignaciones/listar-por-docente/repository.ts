import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorDocenteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorDocenteRepository(docenteId: number) {
    return this.asignaciones.find({
      where: { docenteId },
      order: { aulaId: 'ASC' }
    });
  }
}

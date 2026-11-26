import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorInterpreteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorInterpreteRepository(interpreteId: number) {
    return this.asignaciones.find({
      where: { interpreteId },
      order: { funcionId: 'ASC' }
    });
  }
}

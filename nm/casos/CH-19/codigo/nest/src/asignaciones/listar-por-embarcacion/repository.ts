import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorEmbarcacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorEmbarcacionRepository(embarcacionId: number) {
    return this.asignaciones.find({
      where: { embarcacionId },
      order: { tripulanteId: 'ASC' }
    });
  }
}

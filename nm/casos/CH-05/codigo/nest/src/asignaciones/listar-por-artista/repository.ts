import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorArtistaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorArtistaRepository(artistaId: number) {
    return this.asignaciones.find({
      where: { artistaId },
      order: { actuacionId: 'ASC' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorColaboradorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorColaboradorRepository(colaboradorId: number) {
    return this.asignaciones.find({
      where: { colaboradorId },
      order: { proyectoId: 'ASC' }
    });
  }
}

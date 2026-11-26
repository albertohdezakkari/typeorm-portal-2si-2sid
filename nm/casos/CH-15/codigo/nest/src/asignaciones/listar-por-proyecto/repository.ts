import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorProyectoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorProyectoRepository(proyectoId: number) {
    return this.asignaciones.find({
      where: { proyectoId },
      order: { colaboradorId: 'ASC' }
    });
  }
}

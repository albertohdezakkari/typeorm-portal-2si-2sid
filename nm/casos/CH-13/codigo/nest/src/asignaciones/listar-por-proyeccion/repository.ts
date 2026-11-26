import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorProyeccionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorProyeccionRepository(proyeccionId: number) {
    return this.asignaciones.find({
      where: { proyeccionId },
      order: { tecnicoId: 'ASC' }
    });
  }
}

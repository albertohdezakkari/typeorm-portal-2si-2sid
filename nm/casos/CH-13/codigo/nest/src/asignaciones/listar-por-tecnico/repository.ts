import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorTecnicoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorTecnicoRepository(tecnicoId: number) {
    return this.asignaciones.find({
      where: { tecnicoId },
      order: { proyeccionId: 'ASC' }
    });
  }
}

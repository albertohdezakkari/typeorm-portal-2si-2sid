import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorEnfermeroRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorEnfermeroRepository(enfermeroId: number) {
    return this.asignaciones.find({
      where: { enfermeroId },
      order: { habitacionId: 'ASC' }
    });
  }
}

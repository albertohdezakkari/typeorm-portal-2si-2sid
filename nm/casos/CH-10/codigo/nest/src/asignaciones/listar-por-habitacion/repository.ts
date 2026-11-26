import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorHabitacionRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorHabitacionRepository(habitacionId: number) {
    return this.asignaciones.find({
      where: { habitacionId },
      order: { enfermeroId: 'ASC' }
    });
  }
}

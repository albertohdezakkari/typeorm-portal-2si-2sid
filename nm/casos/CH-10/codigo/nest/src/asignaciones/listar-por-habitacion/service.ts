import { Injectable } from '@nestjs/common';
import { ListarPorHabitacionRepository } from './repository';

@Injectable()
export class ListarPorHabitacionService {
  constructor(private readonly repository: ListarPorHabitacionRepository) {}

  listarAsignacionesPorHabitacionService(habitacionId: number) {
    return this.repository.listarAsignacionesPorHabitacionRepository(habitacionId);
  }
}

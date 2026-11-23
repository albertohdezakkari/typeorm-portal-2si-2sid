import { Injectable } from '@nestjs/common';
import { ListarPorProfesionalRepository } from './repository';

@Injectable()
export class ListarPorProfesionalService {
  constructor(private readonly repository: ListarPorProfesionalRepository) {}

  listarAsignacionesPorProfesionalService(profesionalId: number) {
    return this.repository.listarAsignacionesPorProfesionalRepository(profesionalId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorInterpreteRepository } from './repository';

@Injectable()
export class ListarPorInterpreteService {
  constructor(private readonly repository: ListarPorInterpreteRepository) {}

  listarAsignacionesPorInterpreteService(interpreteId: number) {
    return this.repository.listarAsignacionesPorInterpreteRepository(interpreteId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorAgricultorRepository } from './repository';

@Injectable()
export class ListarPorAgricultorService {
  constructor(private readonly repository: ListarPorAgricultorRepository) {}

  listarAsignacionesPorAgricultorService(agricultorId: number) {
    return this.repository.listarAsignacionesPorAgricultorRepository(agricultorId);
  }
}

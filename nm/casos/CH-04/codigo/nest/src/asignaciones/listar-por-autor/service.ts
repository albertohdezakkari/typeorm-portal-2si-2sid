import { Injectable } from '@nestjs/common';
import { ListarPorAutorRepository } from './repository';

@Injectable()
export class ListarPorAutorService {
  constructor(private readonly repository: ListarPorAutorRepository) {}

  listarAsignacionesPorAutorService(autorId: number) {
    return this.repository.listarAsignacionesPorAutorRepository(autorId);
  }
}

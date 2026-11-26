import { Injectable } from '@nestjs/common';
import { ListarPorLocutorRepository } from './repository';

@Injectable()
export class ListarPorLocutorService {
  constructor(private readonly repository: ListarPorLocutorRepository) {}

  listarAsignacionesPorLocutorService(locutorId: number) {
    return this.repository.listarAsignacionesPorLocutorRepository(locutorId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorInstructorRepository } from './repository';

@Injectable()
export class ListarPorInstructorService {
  constructor(private readonly repository: ListarPorInstructorRepository) {}

  listarAsignacionesPorInstructorService(instructorId: number) {
    return this.repository.listarAsignacionesPorInstructorRepository(instructorId);
  }
}

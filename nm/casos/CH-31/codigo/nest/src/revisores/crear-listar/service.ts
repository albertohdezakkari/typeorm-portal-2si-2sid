import { Injectable } from '@nestjs/common';
import { RevisoresRepository } from './repository';

@Injectable()
export class RevisoresService {
  constructor(private readonly repository: RevisoresRepository) {}

  crearRevisorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearRevisorRepository(nombre, apellidos, email);
  }

  listarRevisoresService() {
    return this.repository.listarRevisoresRepository();
  }
}

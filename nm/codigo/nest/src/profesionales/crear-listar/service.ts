import { Injectable } from '@nestjs/common';
import { ProfesionalesRepository } from './repository';

@Injectable()
export class ProfesionalesService {
  constructor(private readonly repository: ProfesionalesRepository) {}

  crearProfesionalService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearProfesionalRepository(nombre, apellidos, email);
  }

  listarProfesionalesService() {
    return this.repository.listarProfesionalesRepository();
  }
}

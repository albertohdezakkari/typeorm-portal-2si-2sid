import { Injectable } from '@nestjs/common';
import { ConductoresRepository } from './repository';

@Injectable()
export class ConductoresService {
  constructor(private readonly repository: ConductoresRepository) {}

  crearConductorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearConductorRepository(nombre, apellidos, email);
  }

  listarConductoresService() {
    return this.repository.listarConductoresRepository();
  }
}

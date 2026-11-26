import { Injectable } from '@nestjs/common';
import { EntrenadoresRepository } from './repository';

@Injectable()
export class EntrenadoresService {
  constructor(private readonly repository: EntrenadoresRepository) {}

  crearEntrenadorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearEntrenadorRepository(nombre, apellidos, email);
  }

  listarEntrenadoresService() {
    return this.repository.listarEntrenadoresRepository();
  }
}

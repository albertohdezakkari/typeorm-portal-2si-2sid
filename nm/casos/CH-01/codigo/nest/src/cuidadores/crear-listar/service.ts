import { Injectable } from '@nestjs/common';
import { CuidadoresRepository } from './repository';

@Injectable()
export class CuidadoresService {
  constructor(private readonly repository: CuidadoresRepository) {}

  crearCuidadorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearCuidadorRepository(nombre, apellidos, email);
  }

  listarCuidadoresService() {
    return this.repository.listarCuidadoresRepository();
  }
}

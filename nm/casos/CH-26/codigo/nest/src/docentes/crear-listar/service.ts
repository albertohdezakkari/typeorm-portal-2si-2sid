import { Injectable } from '@nestjs/common';
import { DocentesRepository } from './repository';

@Injectable()
export class DocentesService {
  constructor(private readonly repository: DocentesRepository) {}

  crearDocenteService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearDocenteRepository(nombre, apellidos, email);
  }

  listarDocentesService() {
    return this.repository.listarDocentesRepository();
  }
}

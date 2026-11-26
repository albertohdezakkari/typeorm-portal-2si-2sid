import { Injectable } from '@nestjs/common';
import { AgricultoresRepository } from './repository';

@Injectable()
export class AgricultoresService {
  constructor(private readonly repository: AgricultoresRepository) {}

  crearAgricultorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearAgricultorRepository(nombre, apellidos, email);
  }

  listarAgricultoresService() {
    return this.repository.listarAgricultoresRepository();
  }
}

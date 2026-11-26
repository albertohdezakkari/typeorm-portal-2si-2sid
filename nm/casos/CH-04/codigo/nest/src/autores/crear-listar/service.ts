import { Injectable } from '@nestjs/common';
import { AutoresRepository } from './repository';

@Injectable()
export class AutoresService {
  constructor(private readonly repository: AutoresRepository) {}

  crearAutorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearAutorRepository(nombre, apellidos, email);
  }

  listarAutoresService() {
    return this.repository.listarAutoresRepository();
  }
}

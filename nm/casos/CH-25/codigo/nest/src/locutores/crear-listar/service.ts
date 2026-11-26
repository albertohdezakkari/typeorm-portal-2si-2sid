import { Injectable } from '@nestjs/common';
import { LocutoresRepository } from './repository';

@Injectable()
export class LocutoresService {
  constructor(private readonly repository: LocutoresRepository) {}

  crearLocutorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearLocutorRepository(nombre, apellidos, email);
  }

  listarLocutoresService() {
    return this.repository.listarLocutoresRepository();
  }
}

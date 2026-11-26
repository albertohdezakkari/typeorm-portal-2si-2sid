import { Injectable } from '@nestjs/common';
import { ActoresRepository } from './repository';

@Injectable()
export class ActoresService {
  constructor(private readonly repository: ActoresRepository) {}

  crearActorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearActorRepository(nombre, apellidos, email);
  }

  listarActoresService() {
    return this.repository.listarActoresRepository();
  }
}

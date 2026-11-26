import { Injectable } from '@nestjs/common';
import { AnalistasRepository } from './repository';

@Injectable()
export class AnalistasService {
  constructor(private readonly repository: AnalistasRepository) {}

  crearAnalistaService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearAnalistaRepository(nombre, apellidos, email);
  }

  listarAnalistasService() {
    return this.repository.listarAnalistasRepository();
  }
}

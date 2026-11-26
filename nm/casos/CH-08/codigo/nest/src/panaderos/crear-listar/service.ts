import { Injectable } from '@nestjs/common';
import { PanaderosRepository } from './repository';

@Injectable()
export class PanaderosService {
  constructor(private readonly repository: PanaderosRepository) {}

  crearPanaderoService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearPanaderoRepository(nombre, apellidos, email);
  }

  listarPanaderosService() {
    return this.repository.listarPanaderosRepository();
  }
}

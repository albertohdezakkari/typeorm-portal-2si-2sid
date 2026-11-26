import { Injectable } from '@nestjs/common';
import { EnfermerosRepository } from './repository';

@Injectable()
export class EnfermerosService {
  constructor(private readonly repository: EnfermerosRepository) {}

  crearEnfermeroService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearEnfermeroRepository(nombre, apellidos, email);
  }

  listarEnfermerosService() {
    return this.repository.listarEnfermerosRepository();
  }
}

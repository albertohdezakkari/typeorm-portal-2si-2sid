import { Injectable } from '@nestjs/common';
import { CocinerosRepository } from './repository';

@Injectable()
export class CocinerosService {
  constructor(private readonly repository: CocinerosRepository) {}

  crearCocineroService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearCocineroRepository(nombre, apellidos, email);
  }

  listarCocinerosService() {
    return this.repository.listarCocinerosRepository();
  }
}

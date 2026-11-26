import { Injectable } from '@nestjs/common';
import { JardinerosRepository } from './repository';

@Injectable()
export class JardinerosService {
  constructor(private readonly repository: JardinerosRepository) {}

  crearJardineroService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearJardineroRepository(nombre, apellidos, email);
  }

  listarJardinerosService() {
    return this.repository.listarJardinerosRepository();
  }
}

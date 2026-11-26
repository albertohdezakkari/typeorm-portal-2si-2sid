import { Injectable } from '@nestjs/common';
import { RestauradoresRepository } from './repository';

@Injectable()
export class RestauradoresService {
  constructor(private readonly repository: RestauradoresRepository) {}

  crearRestauradorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearRestauradorRepository(nombre, apellidos, email);
  }

  listarRestauradoresService() {
    return this.repository.listarRestauradoresRepository();
  }
}

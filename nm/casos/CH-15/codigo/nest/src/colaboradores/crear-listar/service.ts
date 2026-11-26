import { Injectable } from '@nestjs/common';
import { ColaboradoresRepository } from './repository';

@Injectable()
export class ColaboradoresService {
  constructor(private readonly repository: ColaboradoresRepository) {}

  crearColaboradorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearColaboradorRepository(nombre, apellidos, email);
  }

  listarColaboradoresService() {
    return this.repository.listarColaboradoresRepository();
  }
}

import { Injectable } from '@nestjs/common';
import { MecanicosRepository } from './repository';

@Injectable()
export class MecanicosService {
  constructor(private readonly repository: MecanicosRepository) {}

  crearMecanicoService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearMecanicoRepository(nombre, apellidos, email);
  }

  listarMecanicosService() {
    return this.repository.listarMecanicosRepository();
  }
}

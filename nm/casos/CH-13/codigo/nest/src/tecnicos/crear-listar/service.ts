import { Injectable } from '@nestjs/common';
import { TecnicosRepository } from './repository';

@Injectable()
export class TecnicosService {
  constructor(private readonly repository: TecnicosRepository) {}

  crearTecnicoService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearTecnicoRepository(nombre, apellidos, email);
  }

  listarTecnicosService() {
    return this.repository.listarTecnicosRepository();
  }
}

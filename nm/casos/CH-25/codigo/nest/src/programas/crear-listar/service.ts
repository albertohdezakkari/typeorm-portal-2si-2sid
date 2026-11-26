import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearProgramaService(nombre: string, duracionMinutos: number, emisoraId: number) {
    return this.repository.crearProgramaRepository(nombre, duracionMinutos, emisoraId);
  }

  listarProgramasService() {
    return this.repository.listarProgramasRepository();
  }
}

import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearCosechaService(nombre: string, kilos: number, granjaId: number) {
    return this.repository.crearCosechaRepository(nombre, kilos, granjaId);
  }

  listarCosechasService() {
    return this.repository.listarCosechasRepository();
  }
}

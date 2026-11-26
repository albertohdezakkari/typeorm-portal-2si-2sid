import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearComandaService(nombre: string, importeCentimos: number, cafeteriaId: number) {
    return this.repository.crearComandaRepository(nombre, importeCentimos, cafeteriaId);
  }

  listarComandasService() {
    return this.repository.listarComandasRepository();
  }
}

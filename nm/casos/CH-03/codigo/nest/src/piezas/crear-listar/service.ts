import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearPiezaService(nombre: string, antiguedadAnios: number, museoId: number) {
    return this.repository.crearPiezaRepository(nombre, antiguedadAnios, museoId);
  }

  listarPiezasService() {
    return this.repository.listarPiezasRepository();
  }
}

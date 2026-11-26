import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearParcelaService(nombre: string, superficieM2: number, huertoId: number) {
    return this.repository.crearParcelaRepository(nombre, superficieM2, huertoId);
  }

  listarParcelasService() {
    return this.repository.listarParcelasRepository();
  }
}

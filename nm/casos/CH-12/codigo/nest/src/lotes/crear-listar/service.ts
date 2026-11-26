import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearLoteService(nombre: string, kilos: number, cooperativaId: number) {
    return this.repository.crearLoteRepository(nombre, kilos, cooperativaId);
  }

  listarLotesService() {
    return this.repository.listarLotesRepository();
  }
}

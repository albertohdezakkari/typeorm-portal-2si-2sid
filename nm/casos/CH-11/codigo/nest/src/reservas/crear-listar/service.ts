import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearReservaService(nombre: string, noches: number, hotelId: number) {
    return this.repository.crearReservaRepository(nombre, noches, hotelId);
  }

  listarReservasService() {
    return this.repository.listarReservasRepository();
  }
}

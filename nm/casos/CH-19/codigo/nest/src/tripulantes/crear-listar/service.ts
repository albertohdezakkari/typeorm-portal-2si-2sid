import { Injectable } from '@nestjs/common';
import { TripulantesRepository } from './repository';

@Injectable()
export class TripulantesService {
  constructor(private readonly repository: TripulantesRepository) {}

  crearTripulanteService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearTripulanteRepository(nombre, apellidos, email);
  }

  listarTripulantesService() {
    return this.repository.listarTripulantesRepository();
  }
}

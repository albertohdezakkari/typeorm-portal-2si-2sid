import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarTripulanteRepository } from './repository';

@Injectable()
export class AsignarTripulanteService {
  constructor(private readonly repository: AsignarTripulanteRepository) {}

  async asignarTripulanteService(embarcacionId: number, tripulanteId: number, rol: string) {
    const embarcacion = await this.repository.buscarEmbarcacionRepository(embarcacionId);
    const tripulante = await this.repository.buscarTripulanteRepository(tripulanteId);
    if (!embarcacion || !tripulante) {
      throw new NotFoundException('No existe la embarcacion o el tripulante');
    }

    try {
      return await this.repository.asignarTripulanteRepository(embarcacionId, tripulanteId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tripulante ya está asignado a esa embarcacion');
      }
      throw error;
    }
  }
}

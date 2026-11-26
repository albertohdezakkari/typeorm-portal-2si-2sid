import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarArtistaRepository } from './repository';

@Injectable()
export class AsignarArtistaService {
  constructor(private readonly repository: AsignarArtistaRepository) {}

  async asignarArtistaService(actuacionId: number, artistaId: number, rol: string) {
    const actuacion = await this.repository.buscarActuacionRepository(actuacionId);
    const artista = await this.repository.buscarArtistaRepository(artistaId);
    if (!actuacion || !artista) {
      throw new NotFoundException('No existe la actuacion o el artista');
    }

    try {
      return await this.repository.asignarArtistaRepository(actuacionId, artistaId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El artista ya está asignado a esa actuacion');
      }
      throw error;
    }
  }
}

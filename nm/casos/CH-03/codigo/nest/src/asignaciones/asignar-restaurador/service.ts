import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarRestauradorRepository } from './repository';

@Injectable()
export class AsignarRestauradorService {
  constructor(private readonly repository: AsignarRestauradorRepository) {}

  async asignarRestauradorService(piezaId: number, restauradorId: number, rol: string) {
    const pieza = await this.repository.buscarPiezaRepository(piezaId);
    const restaurador = await this.repository.buscarRestauradorRepository(restauradorId);
    if (!pieza || !restaurador) {
      throw new NotFoundException('No existe la pieza o el restaurador');
    }

    try {
      return await this.repository.asignarRestauradorRepository(piezaId, restauradorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El restaurador ya está asignado a esa pieza');
      }
      throw error;
    }
  }
}

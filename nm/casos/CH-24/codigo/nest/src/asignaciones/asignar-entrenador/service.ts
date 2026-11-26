import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarEntrenadorRepository } from './repository';

@Injectable()
export class AsignarEntrenadorService {
  constructor(private readonly repository: AsignarEntrenadorRepository) {}

  async asignarEntrenadorService(pistaId: number, entrenadorId: number, rol: string) {
    const pista = await this.repository.buscarPistaRepository(pistaId);
    const entrenador = await this.repository.buscarEntrenadorRepository(entrenadorId);
    if (!pista || !entrenador) {
      throw new NotFoundException('No existe la pista o el entrenador');
    }

    try {
      return await this.repository.asignarEntrenadorRepository(pistaId, entrenadorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El entrenador ya está asignado a esa pista');
      }
      throw error;
    }
  }
}

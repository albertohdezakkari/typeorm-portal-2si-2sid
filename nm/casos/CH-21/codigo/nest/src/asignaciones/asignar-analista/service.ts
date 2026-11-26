import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarAnalistaRepository } from './repository';

@Injectable()
export class AsignarAnalistaService {
  constructor(private readonly repository: AsignarAnalistaRepository) {}

  async asignarAnalistaService(muestraId: number, analistaId: number, rol: string) {
    const muestra = await this.repository.buscarMuestraRepository(muestraId);
    const analista = await this.repository.buscarAnalistaRepository(analistaId);
    if (!muestra || !analista) {
      throw new NotFoundException('No existe la muestra o el analista');
    }

    try {
      return await this.repository.asignarAnalistaRepository(muestraId, analistaId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El analista ya está asignado a esa muestra');
      }
      throw error;
    }
  }
}

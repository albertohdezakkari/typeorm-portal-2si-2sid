import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarConductorRepository } from './repository';

@Injectable()
export class AsignarConductorService {
  constructor(private readonly repository: AsignarConductorRepository) {}

  async asignarConductorService(trayectoId: number, conductorId: number, rol: string) {
    const trayecto = await this.repository.buscarTrayectoRepository(trayectoId);
    const conductor = await this.repository.buscarConductorRepository(conductorId);
    if (!trayecto || !conductor) {
      throw new NotFoundException('No existe el trayecto o el conductor');
    }

    try {
      return await this.repository.asignarConductorRepository(trayectoId, conductorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El conductor ya está asignado a ese trayecto');
      }
      throw error;
    }
  }
}

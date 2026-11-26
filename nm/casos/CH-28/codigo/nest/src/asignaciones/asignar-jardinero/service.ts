import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarJardineroRepository } from './repository';

@Injectable()
export class AsignarJardineroService {
  constructor(private readonly repository: AsignarJardineroRepository) {}

  async asignarJardineroService(plantaId: number, jardineroId: number, rol: string) {
    const planta = await this.repository.buscarPlantaRepository(plantaId);
    const jardinero = await this.repository.buscarJardineroRepository(jardineroId);
    if (!planta || !jardinero) {
      throw new NotFoundException('No existe la planta o el jardinero');
    }

    try {
      return await this.repository.asignarJardineroRepository(plantaId, jardineroId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El jardinero ya está asignado a esa planta');
      }
      throw error;
    }
  }
}

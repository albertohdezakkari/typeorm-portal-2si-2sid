import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarJardineroRepository } from './repository';

@Injectable()
export class AsignarJardineroService {
  constructor(private readonly repository: AsignarJardineroRepository) {}

  async asignarJardineroService(zonaId: number, jardineroId: number, rol: string) {
    const zona = await this.repository.buscarZonaRepository(zonaId);
    const jardinero = await this.repository.buscarJardineroRepository(jardineroId);
    if (!zona || !jardinero) {
      throw new NotFoundException('No existe la zona o el jardinero');
    }

    try {
      return await this.repository.asignarJardineroRepository(zonaId, jardineroId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El jardinero ya está asignado a esa zona');
      }
      throw error;
    }
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarGuiaRepository } from './repository';

@Injectable()
export class AsignarGuiaService {
  constructor(private readonly repository: AsignarGuiaRepository) {}

  async asignarGuiaService(excursionId: number, guiaId: number, rol: string) {
    const excursion = await this.repository.buscarExcursionRepository(excursionId);
    const guia = await this.repository.buscarGuiaRepository(guiaId);
    if (!excursion || !guia) {
      throw new NotFoundException('No existe la excursion o el guia');
    }

    try {
      return await this.repository.asignarGuiaRepository(excursionId, guiaId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El guia ya está asignado a esa excursion');
      }
      throw error;
    }
  }
}

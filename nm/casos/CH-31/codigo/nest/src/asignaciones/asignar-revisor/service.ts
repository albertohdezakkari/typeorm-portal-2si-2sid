import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarRevisorRepository } from './repository';

@Injectable()
export class AsignarRevisorService {
  constructor(private readonly repository: AsignarRevisorRepository) {}

  async asignarRevisorService(documentoId: number, revisorId: number, rol: string) {
    const documento = await this.repository.buscarDocumentoRepository(documentoId);
    const revisor = await this.repository.buscarRevisorRepository(revisorId);
    if (!documento || !revisor) {
      throw new NotFoundException('No existe el documento o el revisor');
    }

    try {
      return await this.repository.asignarRevisorRepository(documentoId, revisorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El revisor ya está asignado a ese documento');
      }
      throw error;
    }
  }
}

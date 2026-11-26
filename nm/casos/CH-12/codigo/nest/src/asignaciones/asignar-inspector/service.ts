import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarInspectorRepository } from './repository';

@Injectable()
export class AsignarInspectorService {
  constructor(private readonly repository: AsignarInspectorRepository) {}

  async asignarInspectorService(loteId: number, inspectorId: number, rol: string) {
    const lote = await this.repository.buscarLoteRepository(loteId);
    const inspector = await this.repository.buscarInspectorRepository(inspectorId);
    if (!lote || !inspector) {
      throw new NotFoundException('No existe el lote o el inspector');
    }

    try {
      return await this.repository.asignarInspectorRepository(loteId, inspectorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El inspector ya está asignado a ese lote');
      }
      throw error;
    }
  }
}

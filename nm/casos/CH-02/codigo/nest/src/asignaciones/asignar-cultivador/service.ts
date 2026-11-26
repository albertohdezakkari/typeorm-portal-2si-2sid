import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarCultivadorRepository } from './repository';

@Injectable()
export class AsignarCultivadorService {
  constructor(private readonly repository: AsignarCultivadorRepository) {}

  async asignarCultivadorService(parcelaId: number, cultivadorId: number, rol: string) {
    const parcela = await this.repository.buscarParcelaRepository(parcelaId);
    const cultivador = await this.repository.buscarCultivadorRepository(cultivadorId);
    if (!parcela || !cultivador) {
      throw new NotFoundException('No existe la parcela o el cultivador');
    }

    try {
      return await this.repository.asignarCultivadorRepository(parcelaId, cultivadorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cultivador ya está asignado a esa parcela');
      }
      throw error;
    }
  }
}

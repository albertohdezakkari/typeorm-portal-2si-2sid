import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarColaboradorRepository } from './repository';

@Injectable()
export class AsignarColaboradorService {
  constructor(private readonly repository: AsignarColaboradorRepository) {}

  async asignarColaboradorService(proyectoId: number, colaboradorId: number, rol: string) {
    const proyecto = await this.repository.buscarProyectoRepository(proyectoId);
    const colaborador = await this.repository.buscarColaboradorRepository(colaboradorId);
    if (!proyecto || !colaborador) {
      throw new NotFoundException('No existe el proyecto o el colaborador');
    }

    try {
      return await this.repository.asignarColaboradorRepository(proyectoId, colaboradorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El colaborador ya está asignado a ese proyecto');
      }
      throw error;
    }
  }
}

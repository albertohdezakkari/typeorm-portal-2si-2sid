import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarDocenteRepository } from './repository';

@Injectable()
export class AsignarDocenteService {
  constructor(private readonly repository: AsignarDocenteRepository) {}

  async asignarDocenteService(aulaId: number, docenteId: number, rol: string) {
    const aula = await this.repository.buscarAulaRepository(aulaId);
    const docente = await this.repository.buscarDocenteRepository(docenteId);
    if (!aula || !docente) {
      throw new NotFoundException('No existe la aula o el docente');
    }

    try {
      return await this.repository.asignarDocenteRepository(aulaId, docenteId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El docente ya está asignado a esa aula');
      }
      throw error;
    }
  }
}

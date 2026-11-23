import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarProfesionalRepository } from './repository';

@Injectable()
export class AsignarProfesionalService {
  constructor(private readonly repository: AsignarProfesionalRepository) {}

  async asignarProfesionalService(obraId: number, profesionalId: number, rol: string) {
    const obra = await this.repository.buscarObraRepository(obraId);
    const profesional = await this.repository.buscarProfesionalRepository(profesionalId);
    if (!obra || !profesional) {
      throw new NotFoundException('No existe la obra o el profesional');
    }

    try {
      return await this.repository.asignarProfesionalRepository(obraId, profesionalId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El profesional ya está asignado a esa obra');
      }
      throw error;
    }
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarEnfermeroRepository } from './repository';

@Injectable()
export class AsignarEnfermeroService {
  constructor(private readonly repository: AsignarEnfermeroRepository) {}

  async asignarEnfermeroService(habitacionId: number, enfermeroId: number, rol: string) {
    const habitacion = await this.repository.buscarHabitacionRepository(habitacionId);
    const enfermero = await this.repository.buscarEnfermeroRepository(enfermeroId);
    if (!habitacion || !enfermero) {
      throw new NotFoundException('No existe la habitacion o el enfermero');
    }

    try {
      return await this.repository.asignarEnfermeroRepository(habitacionId, enfermeroId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El enfermero ya está asignado a esa habitacion');
      }
      throw error;
    }
  }
}

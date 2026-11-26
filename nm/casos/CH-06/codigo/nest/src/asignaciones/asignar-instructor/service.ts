import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarInstructorRepository } from './repository';

@Injectable()
export class AsignarInstructorService {
  constructor(private readonly repository: AsignarInstructorRepository) {}

  async asignarInstructorService(sesionId: number, instructorId: number, rol: string) {
    const sesion = await this.repository.buscarSesionRepository(sesionId);
    const instructor = await this.repository.buscarInstructorRepository(instructorId);
    if (!sesion || !instructor) {
      throw new NotFoundException('No existe la sesion o el instructor');
    }

    try {
      return await this.repository.asignarInstructorRepository(sesionId, instructorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El instructor ya está asignado a esa sesion');
      }
      throw error;
    }
  }
}

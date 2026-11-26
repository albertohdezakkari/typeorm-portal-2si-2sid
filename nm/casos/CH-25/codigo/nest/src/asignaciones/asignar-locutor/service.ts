import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarLocutorRepository } from './repository';

@Injectable()
export class AsignarLocutorService {
  constructor(private readonly repository: AsignarLocutorRepository) {}

  async asignarLocutorService(programaId: number, locutorId: number, rol: string) {
    const programa = await this.repository.buscarProgramaRepository(programaId);
    const locutor = await this.repository.buscarLocutorRepository(locutorId);
    if (!programa || !locutor) {
      throw new NotFoundException('No existe el programa o el locutor');
    }

    try {
      return await this.repository.asignarLocutorRepository(programaId, locutorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El locutor ya está asignado a ese programa');
      }
      throw error;
    }
  }
}

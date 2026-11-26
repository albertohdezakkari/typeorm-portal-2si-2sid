import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarCuidadorRepository } from './repository';

@Injectable()
export class AsignarCuidadorService {
  constructor(private readonly repository: AsignarCuidadorRepository) {}

  async asignarCuidadorService(animalId: number, cuidadorId: number, rol: string) {
    const animal = await this.repository.buscarAnimalRepository(animalId);
    const cuidador = await this.repository.buscarCuidadorRepository(cuidadorId);
    if (!animal || !cuidador) {
      throw new NotFoundException('No existe el animal o el cuidador');
    }

    try {
      return await this.repository.asignarCuidadorRepository(animalId, cuidadorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cuidador ya está asignado a ese animal');
      }
      throw error;
    }
  }
}

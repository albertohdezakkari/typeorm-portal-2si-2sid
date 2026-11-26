import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarActorRepository } from './repository';

@Injectable()
export class AsignarActorService {
  constructor(private readonly repository: AsignarActorRepository) {}

  async asignarActorService(escenaId: number, actorId: number, rol: string) {
    const escena = await this.repository.buscarEscenaRepository(escenaId);
    const actor = await this.repository.buscarActorRepository(actorId);
    if (!escena || !actor) {
      throw new NotFoundException('No existe la escena o el actor');
    }

    try {
      return await this.repository.asignarActorRepository(escenaId, actorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El actor ya está asignado a esa escena');
      }
      throw error;
    }
  }
}

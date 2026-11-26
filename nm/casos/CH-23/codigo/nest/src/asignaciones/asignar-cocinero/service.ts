import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarCocineroRepository } from './repository';

@Injectable()
export class AsignarCocineroService {
  constructor(private readonly repository: AsignarCocineroRepository) {}

  async asignarCocineroService(comandaId: number, cocineroId: number, rol: string) {
    const comanda = await this.repository.buscarComandaRepository(comandaId);
    const cocinero = await this.repository.buscarCocineroRepository(cocineroId);
    if (!comanda || !cocinero) {
      throw new NotFoundException('No existe la comanda o el cocinero');
    }

    try {
      return await this.repository.asignarCocineroRepository(comandaId, cocineroId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cocinero ya está asignado a esa comanda');
      }
      throw error;
    }
  }
}

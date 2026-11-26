import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarHuespedRepository } from './repository';

@Injectable()
export class AsignarHuespedService {
  constructor(private readonly repository: AsignarHuespedRepository) {}

  async asignarHuespedService(reservaId: number, huespedId: number, rol: string) {
    const reserva = await this.repository.buscarReservaRepository(reservaId);
    const huesped = await this.repository.buscarHuespedRepository(huespedId);
    if (!reserva || !huesped) {
      throw new NotFoundException('No existe la reserva o el huesped');
    }

    try {
      return await this.repository.asignarHuespedRepository(reservaId, huespedId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El huesped ya está asignado a esa reserva');
      }
      throw error;
    }
  }
}

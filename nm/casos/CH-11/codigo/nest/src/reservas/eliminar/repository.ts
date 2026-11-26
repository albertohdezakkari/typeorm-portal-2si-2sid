import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>
  ) {}

  async eliminarReservaRepository(reservaId: number) {
    await this.reservas.delete(reservaId);
  }
}

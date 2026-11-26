import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>
  ) {}

  async trasladarReservaRepository(reservaId: number, hotelId: number) {
    await this.reservas.update(reservaId, { hotel: { id: hotelId } });
    return this.reservas.createQueryBuilder('p')
      .where('p.id = :reservaId', { reservaId }).getOne();
  }
}

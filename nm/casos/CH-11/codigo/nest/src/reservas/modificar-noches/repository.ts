import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class ModificarNochesRepository {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>
  ) {}

  async modificarNochesRepository(reservaId: number, noches: number) {
    await this.reservas.update(reservaId, { noches });
    return this.reservas.createQueryBuilder('p')
      .where('p.id = :reservaId', { reservaId }).getOne();
  }
}

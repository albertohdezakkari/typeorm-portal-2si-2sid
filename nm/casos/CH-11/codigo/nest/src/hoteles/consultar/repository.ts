import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../../reservas/entities/reserva.entity';
import { Hotel } from '../entities/hotel.entity';

@Injectable()
export class ConsultarHotelRepository {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>,
    @InjectRepository(Hotel) private readonly hoteles: Repository<Hotel>
  ) {}

  async consultarHotelRepository(hotelId: number, minimo: number) {
    const hotel = await this.hoteles.createQueryBuilder('h')
      .where('h.id = :hotelId', { hotelId }).getOne();
    const reservas = await this.reservas.createQueryBuilder('p')
      .innerJoin('p.hotel', 'h')
      .where('h.id = :hotelId', { hotelId })
      .andWhere('p.noches >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { hotel, reservas };
  }
}

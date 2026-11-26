import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from '../entities/reserva.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>
  ) {}

  crearReservaRepository(nombre: string, noches: number, hotelId: number) {
    const reserva = this.reservas.create({
      nombre, noches, hotel: { id: hotelId }
    });
    return this.reservas.save(reserva);
  }

  listarReservasRepository() {
    return this.reservas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

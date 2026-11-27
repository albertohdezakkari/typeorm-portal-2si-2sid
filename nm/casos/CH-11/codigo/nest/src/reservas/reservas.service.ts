import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { Hotel } from '../hoteles/entities/hotel.entity';

@Injectable()
export class ReservasService {
  constructor(
    @InjectRepository(Reserva) private readonly reservas: Repository<Reserva>,
    @InjectRepository(Hotel) private readonly hoteles: Repository<Hotel>
  ) {}

  crearReserva(nombre: string, noches: number, hotelId: number) {
    const reserva = this.reservas.create({
      nombre,
      noches,
      hotel: { id: hotelId }
    });
    return this.reservas.save(reserva);
  }

  listarReservas() {
    return this.reservas.find({ relations: { hotel: true }, order: { id: 'ASC' } });
  }

  async eliminarReserva(reservaId: number) {
    await this.reservas.delete(reservaId);
  }

  async modificarNoches(reservaId: number, noches: number) {
    await this.reservas.update(reservaId, { noches });
    return this.reservas.findOneBy({ id: reservaId });
  }

  async cambiarHotel(reservaId: number, hotelId: number) {
    await this.reservas.update(reservaId, { hotel: { id: hotelId } });
    return this.reservas.findOneBy({ id: reservaId });
  }

  async consultarHotel(hotelId: number, minimo: number) {
    const hotel = await this.hoteles.findOneBy({ id: hotelId });
    const reservas = await this.reservas.find({
      where: {
        hotel: { id: hotelId },
        noches: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { hotel, reservas };
  }
}

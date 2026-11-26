import { Injectable } from '@nestjs/common';
import { ConsultarHotelRepository } from './repository';

@Injectable()
export class ConsultarHotelService {
  constructor(private readonly repository: ConsultarHotelRepository) {}

  consultarHotelService(hotelId: number, minimo: number) {
    return this.repository.consultarHotelRepository(hotelId, minimo);
  }
}

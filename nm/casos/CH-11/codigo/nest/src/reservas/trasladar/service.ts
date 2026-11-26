import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarReservaService(reservaId: number, hotelId: number) {
    return this.repository.trasladarReservaRepository(reservaId, hotelId);
  }
}

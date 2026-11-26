import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarTrayectoService(trayectoId: number, estacionId: number) {
    return this.repository.trasladarTrayectoRepository(trayectoId, estacionId);
  }
}

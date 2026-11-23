import { Injectable } from '@nestjs/common';
import { ConsultarAyuntamientoRepository } from './repository';

@Injectable()
export class ConsultarAyuntamientoService {
  constructor(private readonly repository: ConsultarAyuntamientoRepository) {}

  consultarAyuntamientoService(ayuntamientoId: number, minimo: number) {
    return this.repository.consultarAyuntamientoRepository(ayuntamientoId, minimo);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultarGimnasioRepository } from './repository';

@Injectable()
export class ConsultarGimnasioService {
  constructor(private readonly repository: ConsultarGimnasioRepository) {}

  consultarGimnasioService(gimnasioId: number, minimo: number) {
    return this.repository.consultarGimnasioRepository(gimnasioId, minimo);
  }
}

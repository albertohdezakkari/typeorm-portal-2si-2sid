import { Injectable } from '@nestjs/common';
import { ConsultarGranjaRepository } from './repository';

@Injectable()
export class ConsultarGranjaService {
  constructor(private readonly repository: ConsultarGranjaRepository) {}

  consultarGranjaService(granjaId: number, minimo: number) {
    return this.repository.consultarGranjaRepository(granjaId, minimo);
  }
}

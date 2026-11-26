import { Injectable } from '@nestjs/common';
import { ConsultarCineRepository } from './repository';

@Injectable()
export class ConsultarCineService {
  constructor(private readonly repository: ConsultarCineRepository) {}

  consultarCineService(cineId: number, minimo: number) {
    return this.repository.consultarCineRepository(cineId, minimo);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultarEstudioRepository } from './repository';

@Injectable()
export class ConsultarEstudioService {
  constructor(private readonly repository: ConsultarEstudioRepository) {}

  consultarEstudioService(estudioId: number, minimo: number) {
    return this.repository.consultarEstudioRepository(estudioId, minimo);
  }
}

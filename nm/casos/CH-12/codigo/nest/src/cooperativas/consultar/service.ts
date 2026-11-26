import { Injectable } from '@nestjs/common';
import { ConsultarCooperativaRepository } from './repository';

@Injectable()
export class ConsultarCooperativaService {
  constructor(private readonly repository: ConsultarCooperativaRepository) {}

  consultarCooperativaService(cooperativaId: number, minimo: number) {
    return this.repository.consultarCooperativaRepository(cooperativaId, minimo);
  }
}

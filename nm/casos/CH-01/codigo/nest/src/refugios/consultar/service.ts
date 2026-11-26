import { Injectable } from '@nestjs/common';
import { ConsultarRefugioRepository } from './repository';

@Injectable()
export class ConsultarRefugioService {
  constructor(private readonly repository: ConsultarRefugioRepository) {}

  consultarRefugioService(refugioId: number, minimo: number) {
    return this.repository.consultarRefugioRepository(refugioId, minimo);
  }
}

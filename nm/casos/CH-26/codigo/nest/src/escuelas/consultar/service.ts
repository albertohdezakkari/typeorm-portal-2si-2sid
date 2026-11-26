import { Injectable } from '@nestjs/common';
import { ConsultarEscuelaRepository } from './repository';

@Injectable()
export class ConsultarEscuelaService {
  constructor(private readonly repository: ConsultarEscuelaRepository) {}

  consultarEscuelaService(escuelaId: number, minimo: number) {
    return this.repository.consultarEscuelaRepository(escuelaId, minimo);
  }
}

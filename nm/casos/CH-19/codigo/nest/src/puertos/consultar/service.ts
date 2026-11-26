import { Injectable } from '@nestjs/common';
import { ConsultarPuertoRepository } from './repository';

@Injectable()
export class ConsultarPuertoService {
  constructor(private readonly repository: ConsultarPuertoRepository) {}

  consultarPuertoService(puertoId: number, minimo: number) {
    return this.repository.consultarPuertoRepository(puertoId, minimo);
  }
}

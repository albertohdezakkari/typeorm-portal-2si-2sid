import { Injectable } from '@nestjs/common';
import { ConsultarHuertoRepository } from './repository';

@Injectable()
export class ConsultarHuertoService {
  constructor(private readonly repository: ConsultarHuertoRepository) {}

  consultarHuertoService(huertoId: number, minimo: number) {
    return this.repository.consultarHuertoRepository(huertoId, minimo);
  }
}

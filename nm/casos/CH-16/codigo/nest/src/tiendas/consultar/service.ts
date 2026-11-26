import { Injectable } from '@nestjs/common';
import { ConsultarTiendaRepository } from './repository';

@Injectable()
export class ConsultarTiendaService {
  constructor(private readonly repository: ConsultarTiendaRepository) {}

  consultarTiendaService(tiendaId: number, minimo: number) {
    return this.repository.consultarTiendaRepository(tiendaId, minimo);
  }
}

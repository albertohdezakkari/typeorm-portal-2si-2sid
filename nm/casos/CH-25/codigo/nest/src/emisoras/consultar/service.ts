import { Injectable } from '@nestjs/common';
import { ConsultarEmisoraRepository } from './repository';

@Injectable()
export class ConsultarEmisoraService {
  constructor(private readonly repository: ConsultarEmisoraRepository) {}

  consultarEmisoraService(emisoraId: number, minimo: number) {
    return this.repository.consultarEmisoraRepository(emisoraId, minimo);
  }
}

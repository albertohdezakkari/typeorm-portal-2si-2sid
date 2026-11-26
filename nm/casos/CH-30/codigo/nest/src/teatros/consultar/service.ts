import { Injectable } from '@nestjs/common';
import { ConsultarTeatroRepository } from './repository';

@Injectable()
export class ConsultarTeatroService {
  constructor(private readonly repository: ConsultarTeatroRepository) {}

  consultarTeatroService(teatroId: number, minimo: number) {
    return this.repository.consultarTeatroRepository(teatroId, minimo);
  }
}

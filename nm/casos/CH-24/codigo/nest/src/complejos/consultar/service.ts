import { Injectable } from '@nestjs/common';
import { ConsultarComplejoRepository } from './repository';

@Injectable()
export class ConsultarComplejoService {
  constructor(private readonly repository: ConsultarComplejoRepository) {}

  consultarComplejoService(complejoId: number, minimo: number) {
    return this.repository.consultarComplejoRepository(complejoId, minimo);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultarAgenciaRepository } from './repository';

@Injectable()
export class ConsultarAgenciaService {
  constructor(private readonly repository: ConsultarAgenciaRepository) {}

  consultarAgenciaService(agenciaId: number, minimo: number) {
    return this.repository.consultarAgenciaRepository(agenciaId, minimo);
  }
}

import { Injectable } from '@nestjs/common';
import { ConsultarLaboratorioRepository } from './repository';

@Injectable()
export class ConsultarLaboratorioService {
  constructor(private readonly repository: ConsultarLaboratorioRepository) {}

  consultarLaboratorioService(laboratorioId: number, minimo: number) {
    return this.repository.consultarLaboratorioRepository(laboratorioId, minimo);
  }
}

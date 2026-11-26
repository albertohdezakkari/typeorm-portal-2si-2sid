import { Injectable } from '@nestjs/common';
import { ConsultarEmpresaRepository } from './repository';

@Injectable()
export class ConsultarEmpresaService {
  constructor(private readonly repository: ConsultarEmpresaRepository) {}

  consultarEmpresaService(empresaId: number, minimo: number) {
    return this.repository.consultarEmpresaRepository(empresaId, minimo);
  }
}

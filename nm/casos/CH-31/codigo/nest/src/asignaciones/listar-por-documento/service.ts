import { Injectable } from '@nestjs/common';
import { ListarPorDocumentoRepository } from './repository';

@Injectable()
export class ListarPorDocumentoService {
  constructor(private readonly repository: ListarPorDocumentoRepository) {}

  listarAsignacionesPorDocumentoService(documentoId: number) {
    return this.repository.listarAsignacionesPorDocumentoRepository(documentoId);
  }
}

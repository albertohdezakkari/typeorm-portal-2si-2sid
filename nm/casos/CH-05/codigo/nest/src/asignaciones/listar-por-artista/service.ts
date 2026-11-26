import { Injectable } from '@nestjs/common';
import { ListarPorArtistaRepository } from './repository';

@Injectable()
export class ListarPorArtistaService {
  constructor(private readonly repository: ListarPorArtistaRepository) {}

  listarAsignacionesPorArtistaService(artistaId: number) {
    return this.repository.listarAsignacionesPorArtistaRepository(artistaId);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorPublicacionRepository } from './repository';

@Injectable()
export class ListarPorPublicacionService {
  constructor(private readonly repository: ListarPorPublicacionRepository) {}

  listarAsignacionesPorPublicacionService(publicacionId: number) {
    return this.repository.listarAsignacionesPorPublicacionRepository(publicacionId);
  }
}

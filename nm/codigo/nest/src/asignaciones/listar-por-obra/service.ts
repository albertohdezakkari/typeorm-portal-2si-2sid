import { Injectable } from '@nestjs/common';
import { ListarPorObraRepository } from './repository';

@Injectable()
export class ListarPorObraService {
  constructor(private readonly repository: ListarPorObraRepository) {}

  listarAsignacionesPorObraService(obraId: number) {
    return this.repository.listarAsignacionesPorObraRepository(obraId);
  }
}

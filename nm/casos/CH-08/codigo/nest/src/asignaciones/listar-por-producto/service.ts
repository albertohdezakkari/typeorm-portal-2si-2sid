import { Injectable } from '@nestjs/common';
import { ListarPorProductoRepository } from './repository';

@Injectable()
export class ListarPorProductoService {
  constructor(private readonly repository: ListarPorProductoRepository) {}

  listarAsignacionesPorProductoService(productoId: number) {
    return this.repository.listarAsignacionesPorProductoRepository(productoId);
  }
}

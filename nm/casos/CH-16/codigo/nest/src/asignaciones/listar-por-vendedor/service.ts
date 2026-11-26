import { Injectable } from '@nestjs/common';
import { ListarPorVendedorRepository } from './repository';

@Injectable()
export class ListarPorVendedorService {
  constructor(private readonly repository: ListarPorVendedorRepository) {}

  listarAsignacionesPorVendedorService(vendedorId: number) {
    return this.repository.listarAsignacionesPorVendedorRepository(vendedorId);
  }
}

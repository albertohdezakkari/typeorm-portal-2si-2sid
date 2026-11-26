import { Injectable } from '@nestjs/common';
import { ModificarStockRepository } from './repository';

@Injectable()
export class ModificarStockService {
  constructor(private readonly repository: ModificarStockRepository) {}

  modificarStockService(articuloId: number, stock: number) {
    return this.repository.modificarStockRepository(articuloId, stock);
  }
}

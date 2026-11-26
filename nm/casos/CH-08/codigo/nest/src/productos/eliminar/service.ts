import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarProductoService(productoId: number) {
    return this.repository.eliminarProductoRepository(productoId);
  }
}

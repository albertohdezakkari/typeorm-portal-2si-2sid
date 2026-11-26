import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarProductoService(productoId: number, panaderiaId: number) {
    return this.repository.trasladarProductoRepository(productoId, panaderiaId);
  }
}

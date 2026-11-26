import { Injectable } from '@nestjs/common';
import { EliminarRepository } from './repository';

@Injectable()
export class EliminarService {
  constructor(private readonly repository: EliminarRepository) {}

  eliminarFuncionService(funcionId: number) {
    return this.repository.eliminarFuncionRepository(funcionId);
  }
}

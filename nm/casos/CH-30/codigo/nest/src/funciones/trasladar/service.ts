import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarFuncionService(funcionId: number, teatroId: number) {
    return this.repository.trasladarFuncionRepository(funcionId, teatroId);
  }
}

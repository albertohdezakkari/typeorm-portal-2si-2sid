import { Injectable } from '@nestjs/common';
import { TrasladarRepository } from './repository';

@Injectable()
export class TrasladarService {
  constructor(private readonly repository: TrasladarRepository) {}

  trasladarSesionService(sesionId: number, gimnasioId: number) {
    return this.repository.trasladarSesionRepository(sesionId, gimnasioId);
  }
}

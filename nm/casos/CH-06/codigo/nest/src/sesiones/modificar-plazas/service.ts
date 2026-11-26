import { Injectable } from '@nestjs/common';
import { ModificarPlazasRepository } from './repository';

@Injectable()
export class ModificarPlazasService {
  constructor(private readonly repository: ModificarPlazasRepository) {}

  modificarPlazasService(sesionId: number, plazas: number) {
    return this.repository.modificarPlazasRepository(sesionId, plazas);
  }
}

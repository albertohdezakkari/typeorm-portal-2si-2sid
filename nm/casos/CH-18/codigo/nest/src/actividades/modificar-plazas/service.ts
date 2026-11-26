import { Injectable } from '@nestjs/common';
import { ModificarPlazasRepository } from './repository';

@Injectable()
export class ModificarPlazasService {
  constructor(private readonly repository: ModificarPlazasRepository) {}

  modificarPlazasService(actividadId: number, plazas: number) {
    return this.repository.modificarPlazasRepository(actividadId, plazas);
  }
}

import { Injectable } from '@nestjs/common';
import { ModificarSuperficieM2Repository } from './repository';

@Injectable()
export class ModificarSuperficieM2Service {
  constructor(private readonly repository: ModificarSuperficieM2Repository) {}

  modificarSuperficieM2Service(plazaId: number, superficieM2: number) {
    return this.repository.modificarSuperficieM2Repository(plazaId, superficieM2);
  }
}

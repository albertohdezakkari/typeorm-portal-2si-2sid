import { Injectable } from '@nestjs/common';
import { ModificarSuperficieRepository } from './repository';

@Injectable()
export class ModificarSuperficieService {
  constructor(private readonly repository: ModificarSuperficieRepository) {}

  modificarSuperficieService(parcelaId: number, superficieM2: number) {
    return this.repository.modificarSuperficieRepository(parcelaId, superficieM2);
  }
}

import { Injectable } from '@nestjs/common';
import { ListarPorAnimalRepository } from './repository';

@Injectable()
export class ListarPorAnimalService {
  constructor(private readonly repository: ListarPorAnimalRepository) {}

  listarAsignacionesPorAnimalService(animalId: number) {
    return this.repository.listarAsignacionesPorAnimalRepository(animalId);
  }
}

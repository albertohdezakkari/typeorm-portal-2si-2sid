import { Injectable } from '@nestjs/common';
import { CrearListarRepository } from './repository';

@Injectable()
export class CrearListarService {
  constructor(private readonly repository: CrearListarRepository) {}

  crearAnimalService(nombre: string, edadMeses: number, refugioId: number) {
    return this.repository.crearAnimalRepository(nombre, edadMeses, refugioId);
  }

  listarAnimalesService() {
    return this.repository.listarAnimalesRepository();
  }
}

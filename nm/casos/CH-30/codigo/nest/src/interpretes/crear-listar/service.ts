import { Injectable } from '@nestjs/common';
import { InterpretesRepository } from './repository';

@Injectable()
export class InterpretesService {
  constructor(private readonly repository: InterpretesRepository) {}

  crearInterpreteService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearInterpreteRepository(nombre, apellidos, email);
  }

  listarInterpretesService() {
    return this.repository.listarInterpretesRepository();
  }
}

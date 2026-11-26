import { Injectable } from '@nestjs/common';
import { InstructoresRepository } from './repository';

@Injectable()
export class InstructoresService {
  constructor(private readonly repository: InstructoresRepository) {}

  crearInstructorService(nombre: string, apellidos: string, email: string) {
    return this.repository.crearInstructorRepository(nombre, apellidos, email);
  }

  listarInstructoresService() {
    return this.repository.listarInstructoresRepository();
  }
}

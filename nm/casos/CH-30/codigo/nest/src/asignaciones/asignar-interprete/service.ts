import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarInterpreteRepository } from './repository';

@Injectable()
export class AsignarInterpreteService {
  constructor(private readonly repository: AsignarInterpreteRepository) {}

  async asignarInterpreteService(funcionId: number, interpreteId: number, rol: string) {
    const funcion = await this.repository.buscarFuncionRepository(funcionId);
    const interprete = await this.repository.buscarInterpreteRepository(interpreteId);
    if (!funcion || !interprete) {
      throw new NotFoundException('No existe la funcion o el interprete');
    }

    try {
      return await this.repository.asignarInterpreteRepository(funcionId, interpreteId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El interprete ya está asignado a esa funcion');
      }
      throw error;
    }
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarAgricultorRepository } from './repository';

@Injectable()
export class AsignarAgricultorService {
  constructor(private readonly repository: AsignarAgricultorRepository) {}

  async asignarAgricultorService(cosechaId: number, agricultorId: number, rol: string) {
    const cosecha = await this.repository.buscarCosechaRepository(cosechaId);
    const agricultor = await this.repository.buscarAgricultorRepository(agricultorId);
    if (!cosecha || !agricultor) {
      throw new NotFoundException('No existe la cosecha o el agricultor');
    }

    try {
      return await this.repository.asignarAgricultorRepository(cosechaId, agricultorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El agricultor ya está asignado a esa cosecha');
      }
      throw error;
    }
  }
}

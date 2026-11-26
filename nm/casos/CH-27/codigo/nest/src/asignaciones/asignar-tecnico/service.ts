import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarTecnicoRepository } from './repository';

@Injectable()
export class AsignarTecnicoService {
  constructor(private readonly repository: AsignarTecnicoRepository) {}

  async asignarTecnicoService(plazaId: number, tecnicoId: number, rol: string) {
    const plaza = await this.repository.buscarPlazaRepository(plazaId);
    const tecnico = await this.repository.buscarTecnicoRepository(tecnicoId);
    if (!plaza || !tecnico) {
      throw new NotFoundException('No existe la plaza o el tecnico');
    }

    try {
      return await this.repository.asignarTecnicoRepository(plazaId, tecnicoId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tecnico ya está asignado a esa plaza');
      }
      throw error;
    }
  }
}

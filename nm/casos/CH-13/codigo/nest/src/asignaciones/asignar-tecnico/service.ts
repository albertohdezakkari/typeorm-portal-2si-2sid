import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarTecnicoRepository } from './repository';

@Injectable()
export class AsignarTecnicoService {
  constructor(private readonly repository: AsignarTecnicoRepository) {}

  async asignarTecnicoService(proyeccionId: number, tecnicoId: number, rol: string) {
    const proyeccion = await this.repository.buscarProyeccionRepository(proyeccionId);
    const tecnico = await this.repository.buscarTecnicoRepository(tecnicoId);
    if (!proyeccion || !tecnico) {
      throw new NotFoundException('No existe la proyeccion o el tecnico');
    }

    try {
      return await this.repository.asignarTecnicoRepository(proyeccionId, tecnicoId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tecnico ya está asignado a esa proyeccion');
      }
      throw error;
    }
  }
}

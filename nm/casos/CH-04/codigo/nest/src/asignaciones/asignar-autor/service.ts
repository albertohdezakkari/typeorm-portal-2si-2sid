import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarAutorRepository } from './repository';

@Injectable()
export class AsignarAutorService {
  constructor(private readonly repository: AsignarAutorRepository) {}

  async asignarAutorService(publicacionId: number, autorId: number, rol: string) {
    const publicacion = await this.repository.buscarPublicacionRepository(publicacionId);
    const autor = await this.repository.buscarAutorRepository(autorId);
    if (!publicacion || !autor) {
      throw new NotFoundException('No existe la publicacion o el autor');
    }

    try {
      return await this.repository.asignarAutorRepository(publicacionId, autorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El autor ya está asignado a esa publicacion');
      }
      throw error;
    }
  }
}

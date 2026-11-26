import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarMecanicoRepository } from './repository';

@Injectable()
export class AsignarMecanicoService {
  constructor(private readonly repository: AsignarMecanicoRepository) {}

  async asignarMecanicoService(reparacionId: number, mecanicoId: number, rol: string) {
    const reparacion = await this.repository.buscarReparacionRepository(reparacionId);
    const mecanico = await this.repository.buscarMecanicoRepository(mecanicoId);
    if (!reparacion || !mecanico) {
      throw new NotFoundException('No existe la reparacion o el mecanico');
    }

    try {
      return await this.repository.asignarMecanicoRepository(reparacionId, mecanicoId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El mecanico ya está asignado a esa reparacion');
      }
      throw error;
    }
  }
}

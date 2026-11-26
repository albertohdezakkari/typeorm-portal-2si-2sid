import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarVendedorRepository } from './repository';

@Injectable()
export class AsignarVendedorService {
  constructor(private readonly repository: AsignarVendedorRepository) {}

  async asignarVendedorService(articuloId: number, vendedorId: number, rol: string) {
    const articulo = await this.repository.buscarArticuloRepository(articuloId);
    const vendedor = await this.repository.buscarVendedorRepository(vendedorId);
    if (!articulo || !vendedor) {
      throw new NotFoundException('No existe el articulo o el vendedor');
    }

    try {
      return await this.repository.asignarVendedorRepository(articuloId, vendedorId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El vendedor ya está asignado a ese articulo');
      }
      throw error;
    }
  }
}

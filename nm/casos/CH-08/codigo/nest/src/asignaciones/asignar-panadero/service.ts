import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { AsignarPanaderoRepository } from './repository';

@Injectable()
export class AsignarPanaderoService {
  constructor(private readonly repository: AsignarPanaderoRepository) {}

  async asignarPanaderoService(productoId: number, panaderoId: number, rol: string) {
    const producto = await this.repository.buscarProductoRepository(productoId);
    const panadero = await this.repository.buscarPanaderoRepository(panaderoId);
    if (!producto || !panadero) {
      throw new NotFoundException('No existe el producto o el panadero');
    }

    try {
      return await this.repository.asignarPanaderoRepository(productoId, panaderoId, rol);
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El panadero ya está asignado a ese producto');
      }
      throw error;
    }
  }
}

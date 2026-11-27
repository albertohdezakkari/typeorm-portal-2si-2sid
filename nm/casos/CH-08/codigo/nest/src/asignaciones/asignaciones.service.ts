import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Panadero } from '../panaderos/entities/panadero.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Producto) private readonly productos: Repository<Producto>,
    @InjectRepository(Panadero) private readonly panaderos: Repository<Panadero>
  ) {}

  async asignarPanadero(productoId: number, panaderoId: number, rol: string) {
    const producto = await this.productos.findOneBy({ id: productoId });
    const panadero = await this.panaderos.findOneBy({ id: panaderoId });
    if (!producto || !panadero) {
      throw new NotFoundException('No existe el producto o el panadero');
    }
    const asignacion = { productoId, panaderoId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El panadero ya está asignado a ese producto');
      }
      throw error;
    }
  }

  listarPorProducto(productoId: number) {
    return this.asignaciones.find({ where: { productoId }, order: { panaderoId: 'ASC' } });
  }

  listarPorPanadero(panaderoId: number) {
    return this.asignaciones.find({ where: { panaderoId }, order: { productoId: 'ASC' } });
  }

  async modificarRol(productoId: number, panaderoId: number, rol: string) {
    const resultado = await this.asignaciones.update({ productoId, panaderoId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { productoId, panaderoId, rol };
  }

  async eliminarAsignacion(productoId: number, panaderoId: number) {
    await this.asignaciones.delete({ productoId, panaderoId });
  }
}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Articulo } from '../articulos/entities/articulo.entity';
import { Vendedor } from '../vendedores/entities/vendedor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>,
    @InjectRepository(Vendedor) private readonly vendedores: Repository<Vendedor>
  ) {}

  async asignarVendedor(articuloId: number, vendedorId: number, rol: string) {
    const articulo = await this.articulos.findOneBy({ id: articuloId });
    const vendedor = await this.vendedores.findOneBy({ id: vendedorId });
    if (!articulo || !vendedor) {
      throw new NotFoundException('No existe el articulo o el vendedor');
    }
    const asignacion = { articuloId, vendedorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El vendedor ya está asignado a ese articulo');
      }
      throw error;
    }
  }

  listarPorArticulo(articuloId: number) {
    return this.asignaciones.find({ where: { articuloId }, order: { vendedorId: 'ASC' } });
  }

  listarPorVendedor(vendedorId: number) {
    return this.asignaciones.find({ where: { vendedorId }, order: { articuloId: 'ASC' } });
  }

  async modificarRol(articuloId: number, vendedorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ articuloId, vendedorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { articuloId, vendedorId, rol };
  }

  async eliminarAsignacion(articuloId: number, vendedorId: number) {
    await this.asignaciones.delete({ articuloId, vendedorId });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Articulo } from '../../articulos/entities/articulo.entity';
import { Vendedor } from '../../vendedores/entities/vendedor.entity';

@Injectable()
export class AsignarVendedorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>,
    @InjectRepository(Vendedor) private readonly vendedores: Repository<Vendedor>
  ) {}

  buscarArticuloRepository(articuloId: number) {
    return this.articulos.findOneBy({ id: articuloId });
  }

  buscarVendedorRepository(vendedorId: number) {
    return this.vendedores.findOneBy({ id: vendedorId });
  }

  async asignarVendedorRepository(articuloId: number, vendedorId: number, rol: string) {
    const asignacion = { articuloId, vendedorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

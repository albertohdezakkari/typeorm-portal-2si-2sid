import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Producto } from '../../productos/entities/producto.entity';
import { Panadero } from '../../panaderos/entities/panadero.entity';

@Injectable()
export class AsignarPanaderoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Producto) private readonly productos: Repository<Producto>,
    @InjectRepository(Panadero) private readonly panaderos: Repository<Panadero>
  ) {}

  buscarProductoRepository(productoId: number) {
    return this.productos.findOneBy({ id: productoId });
  }

  buscarPanaderoRepository(panaderoId: number) {
    return this.panaderos.findOneBy({ id: panaderoId });
  }

  async asignarPanaderoRepository(productoId: number, panaderoId: number, rol: string) {
    const asignacion = { productoId, panaderoId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

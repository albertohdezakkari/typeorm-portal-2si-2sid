import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class ModificarPrecioCentimosRepository {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>
  ) {}

  async modificarPrecioCentimosRepository(productoId: number, precioCentimos: number) {
    await this.productos.update(productoId, { precioCentimos });
    return this.productos.createQueryBuilder('p')
      .where('p.id = :productoId', { productoId }).getOne();
  }
}

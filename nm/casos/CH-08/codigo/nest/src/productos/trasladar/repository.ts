import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>
  ) {}

  async trasladarProductoRepository(productoId: number, panaderiaId: number) {
    await this.productos.update(productoId, { panaderia: { id: panaderiaId } });
    return this.productos.createQueryBuilder('p')
      .where('p.id = :productoId', { productoId }).getOne();
  }
}

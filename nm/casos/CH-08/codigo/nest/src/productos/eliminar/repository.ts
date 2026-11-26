import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>
  ) {}

  async eliminarProductoRepository(productoId: number) {
    await this.productos.delete(productoId);
  }
}

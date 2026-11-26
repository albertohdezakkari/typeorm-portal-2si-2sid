import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../entities/producto.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>
  ) {}

  crearProductoRepository(nombre: string, precioCentimos: number, panaderiaId: number) {
    const producto = this.productos.create({
      nombre, precioCentimos, panaderia: { id: panaderiaId }
    });
    return this.productos.save(producto);
  }

  listarProductosRepository() {
    return this.productos.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

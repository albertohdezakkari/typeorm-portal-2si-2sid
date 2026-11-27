import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Producto } from './entities/producto.entity';
import { Panaderia } from '../panaderias/entities/panaderia.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>,
    @InjectRepository(Panaderia) private readonly panaderias: Repository<Panaderia>
  ) {}

  crearProducto(nombre: string, precioCentimos: number, panaderiaId: number) {
    const producto = this.productos.create({
      nombre,
      precioCentimos,
      panaderia: { id: panaderiaId }
    });
    return this.productos.save(producto);
  }

  listarProductos() {
    return this.productos.find({ relations: { panaderia: true }, order: { id: 'ASC' } });
  }

  async eliminarProducto(productoId: number) {
    await this.productos.delete(productoId);
  }

  async modificarPrecioCentimos(productoId: number, precioCentimos: number) {
    await this.productos.update(productoId, { precioCentimos });
    return this.productos.findOneBy({ id: productoId });
  }

  async cambiarPanaderia(productoId: number, panaderiaId: number) {
    await this.productos.update(productoId, { panaderia: { id: panaderiaId } });
    return this.productos.findOneBy({ id: productoId });
  }

  async consultarPanaderia(panaderiaId: number, minimo: number) {
    const panaderia = await this.panaderias.findOneBy({ id: panaderiaId });
    const productos = await this.productos.find({
      where: {
        panaderia: { id: panaderiaId },
        precioCentimos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { panaderia, productos };
  }
}

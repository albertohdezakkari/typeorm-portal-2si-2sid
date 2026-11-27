import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Articulo } from './entities/articulo.entity';
import { Tienda } from '../tiendas/entities/tienda.entity';

@Injectable()
export class ArticulosService {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>,
    @InjectRepository(Tienda) private readonly tiendas: Repository<Tienda>
  ) {}

  crearArticulo(nombre: string, stock: number, tiendaId: number) {
    const articulo = this.articulos.create({
      nombre,
      stock,
      tienda: { id: tiendaId }
    });
    return this.articulos.save(articulo);
  }

  listarArticulos() {
    return this.articulos.find({ relations: { tienda: true }, order: { id: 'ASC' } });
  }

  async eliminarArticulo(articuloId: number) {
    await this.articulos.delete(articuloId);
  }

  async modificarStock(articuloId: number, stock: number) {
    await this.articulos.update(articuloId, { stock });
    return this.articulos.findOneBy({ id: articuloId });
  }

  async cambiarTienda(articuloId: number, tiendaId: number) {
    await this.articulos.update(articuloId, { tienda: { id: tiendaId } });
    return this.articulos.findOneBy({ id: articuloId });
  }

  async consultarTienda(tiendaId: number, minimo: number) {
    const tienda = await this.tiendas.findOneBy({ id: tiendaId });
    const articulos = await this.articulos.find({
      where: {
        tienda: { id: tiendaId },
        stock: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { tienda, articulos };
  }
}

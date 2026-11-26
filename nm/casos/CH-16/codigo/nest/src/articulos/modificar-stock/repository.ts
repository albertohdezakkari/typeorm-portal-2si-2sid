import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '../entities/articulo.entity';

@Injectable()
export class ModificarStockRepository {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>
  ) {}

  async modificarStockRepository(articuloId: number, stock: number) {
    await this.articulos.update(articuloId, { stock });
    return this.articulos.createQueryBuilder('p')
      .where('p.id = :articuloId', { articuloId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '../entities/articulo.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>
  ) {}

  async trasladarArticuloRepository(articuloId: number, tiendaId: number) {
    await this.articulos.update(articuloId, { tienda: { id: tiendaId } });
    return this.articulos.createQueryBuilder('p')
      .where('p.id = :articuloId', { articuloId }).getOne();
  }
}

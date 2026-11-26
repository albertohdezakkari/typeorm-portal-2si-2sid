import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Articulo } from '../../articulos/entities/articulo.entity';
import { Tienda } from '../entities/tienda.entity';

@Injectable()
export class ConsultarTiendaRepository {
  constructor(
    @InjectRepository(Articulo) private readonly articulos: Repository<Articulo>,
    @InjectRepository(Tienda) private readonly tiendas: Repository<Tienda>
  ) {}

  async consultarTiendaRepository(tiendaId: number, minimo: number) {
    const tienda = await this.tiendas.createQueryBuilder('h')
      .where('h.id = :tiendaId', { tiendaId }).getOne();
    const articulos = await this.articulos.createQueryBuilder('p')
      .innerJoin('p.tienda', 'h')
      .where('h.id = :tiendaId', { tiendaId })
      .andWhere('p.stock >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { tienda, articulos };
  }
}

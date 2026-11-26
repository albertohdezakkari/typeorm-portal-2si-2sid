import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../../productos/entities/producto.entity';
import { Panaderia } from '../entities/panaderia.entity';

@Injectable()
export class ConsultarPanaderiaRepository {
  constructor(
    @InjectRepository(Producto) private readonly productos: Repository<Producto>,
    @InjectRepository(Panaderia) private readonly panaderias: Repository<Panaderia>
  ) {}

  async consultarPanaderiaRepository(panaderiaId: number, minimo: number) {
    const panaderia = await this.panaderias.createQueryBuilder('h')
      .where('h.id = :panaderiaId', { panaderiaId }).getOne();
    const productos = await this.productos.createQueryBuilder('p')
      .innerJoin('p.panaderia', 'h')
      .where('h.id = :panaderiaId', { panaderiaId })
      .andWhere('p.precioCentimos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { panaderia, productos };
  }
}

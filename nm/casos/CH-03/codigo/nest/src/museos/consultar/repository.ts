import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from '../../piezas/entities/pieza.entity';
import { Museo } from '../entities/museo.entity';

@Injectable()
export class ConsultarMuseoRepository {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>,
    @InjectRepository(Museo) private readonly museos: Repository<Museo>
  ) {}

  async consultarMuseoRepository(museoId: number, minimo: number) {
    const museo = await this.museos.createQueryBuilder('h')
      .where('h.id = :museoId', { museoId }).getOne();
    const piezas = await this.piezas.createQueryBuilder('p')
      .innerJoin('p.museo', 'h')
      .where('h.id = :museoId', { museoId })
      .andWhere('p.antiguedadAnios >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { museo, piezas };
  }
}

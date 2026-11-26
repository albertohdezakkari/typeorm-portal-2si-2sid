import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../../lotes/entities/lote.entity';
import { Cooperativa } from '../entities/cooperativa.entity';

@Injectable()
export class ConsultarCooperativaRepository {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    @InjectRepository(Cooperativa) private readonly cooperativas: Repository<Cooperativa>
  ) {}

  async consultarCooperativaRepository(cooperativaId: number, minimo: number) {
    const cooperativa = await this.cooperativas.createQueryBuilder('h')
      .where('h.id = :cooperativaId', { cooperativaId }).getOne();
    const lotes = await this.lotes.createQueryBuilder('p')
      .innerJoin('p.cooperativa', 'h')
      .where('h.id = :cooperativaId', { cooperativaId })
      .andWhere('p.kilos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { cooperativa, lotes };
  }
}

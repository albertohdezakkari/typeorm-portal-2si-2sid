import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>
  ) {}

  async trasladarLoteRepository(loteId: number, cooperativaId: number) {
    await this.lotes.update(loteId, { cooperativa: { id: cooperativaId } });
    return this.lotes.createQueryBuilder('p')
      .where('p.id = :loteId', { loteId }).getOne();
  }
}

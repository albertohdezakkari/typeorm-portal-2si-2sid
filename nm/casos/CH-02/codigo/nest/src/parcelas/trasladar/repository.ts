import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../entities/parcela.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>
  ) {}

  async trasladarParcelaRepository(parcelaId: number, huertoId: number) {
    await this.parcelas.update(parcelaId, { huerto: { id: huertoId } });
    return this.parcelas.createQueryBuilder('p')
      .where('p.id = :parcelaId', { parcelaId }).getOne();
  }
}

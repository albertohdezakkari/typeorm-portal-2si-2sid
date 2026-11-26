import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../entities/parcela.entity';

@Injectable()
export class ModificarSuperficieRepository {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>
  ) {}

  async modificarSuperficieRepository(parcelaId: number, superficieM2: number) {
    await this.parcelas.update(parcelaId, { superficieM2 });
    return this.parcelas.createQueryBuilder('p')
      .where('p.id = :parcelaId', { parcelaId }).getOne();
  }
}

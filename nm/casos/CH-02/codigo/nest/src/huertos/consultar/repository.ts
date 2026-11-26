import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../../parcelas/entities/parcela.entity';
import { Huerto } from '../entities/huerto.entity';

@Injectable()
export class ConsultarHuertoRepository {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>,
    @InjectRepository(Huerto) private readonly huertos: Repository<Huerto>
  ) {}

  async consultarHuertoRepository(huertoId: number, minimo: number) {
    const huerto = await this.huertos.createQueryBuilder('h')
      .where('h.id = :huertoId', { huertoId }).getOne();
    const parcelas = await this.parcelas.createQueryBuilder('p')
      .innerJoin('p.huerto', 'h')
      .where('h.id = :huertoId', { huertoId })
      .andWhere('p.superficieM2 >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { huerto, parcelas };
  }
}

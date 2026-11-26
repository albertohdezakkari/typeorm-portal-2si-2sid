import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosecha } from '../../cosechas/entities/cosecha.entity';
import { Granja } from '../entities/granja.entity';

@Injectable()
export class ConsultarGranjaRepository {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>,
    @InjectRepository(Granja) private readonly granjas: Repository<Granja>
  ) {}

  async consultarGranjaRepository(granjaId: number, minimo: number) {
    const granja = await this.granjas.createQueryBuilder('h')
      .where('h.id = :granjaId', { granjaId }).getOne();
    const cosechas = await this.cosechas.createQueryBuilder('p')
      .innerJoin('p.granja', 'h')
      .where('h.id = :granjaId', { granjaId })
      .andWhere('p.kilos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { granja, cosechas };
  }
}

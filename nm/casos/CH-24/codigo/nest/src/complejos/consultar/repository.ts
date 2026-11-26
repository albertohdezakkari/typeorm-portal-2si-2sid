import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from '../../pistas/entities/pista.entity';
import { Complejo } from '../entities/complejo.entity';

@Injectable()
export class ConsultarComplejoRepository {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>,
    @InjectRepository(Complejo) private readonly complejos: Repository<Complejo>
  ) {}

  async consultarComplejoRepository(complejoId: number, minimo: number) {
    const complejo = await this.complejos.createQueryBuilder('h')
      .where('h.id = :complejoId', { complejoId }).getOne();
    const pistas = await this.pistas.createQueryBuilder('p')
      .innerJoin('p.complejo', 'h')
      .where('h.id = :complejoId', { complejoId })
      .andWhere('p.superficieM2 >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { complejo, pistas };
  }
}

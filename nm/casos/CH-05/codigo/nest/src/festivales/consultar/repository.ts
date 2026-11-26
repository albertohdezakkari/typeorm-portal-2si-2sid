import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actuacion } from '../../actuaciones/entities/actuacion.entity';
import { Festival } from '../entities/festival.entity';

@Injectable()
export class ConsultarFestivalRepository {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>,
    @InjectRepository(Festival) private readonly festivales: Repository<Festival>
  ) {}

  async consultarFestivalRepository(festivalId: number, minimo: number) {
    const festival = await this.festivales.createQueryBuilder('h')
      .where('h.id = :festivalId', { festivalId }).getOne();
    const actuaciones = await this.actuaciones.createQueryBuilder('p')
      .innerJoin('p.festival', 'h')
      .where('h.id = :festivalId', { festivalId })
      .andWhere('p.duracionMinutos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { festival, actuaciones };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from '../../excursiones/entities/excursion.entity';
import { Agencia } from '../entities/agencia.entity';

@Injectable()
export class ConsultarAgenciaRepository {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>,
    @InjectRepository(Agencia) private readonly agencias: Repository<Agencia>
  ) {}

  async consultarAgenciaRepository(agenciaId: number, minimo: number) {
    const agencia = await this.agencias.createQueryBuilder('h')
      .where('h.id = :agenciaId', { agenciaId }).getOne();
    const excursiones = await this.excursiones.createQueryBuilder('p')
      .innerJoin('p.agencia', 'h')
      .where('h.id = :agenciaId', { agenciaId })
      .andWhere('p.duracionHoras >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { agencia, excursiones };
  }
}

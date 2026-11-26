import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escena } from '../../escenas/entities/escena.entity';
import { Estudio } from '../entities/estudio.entity';

@Injectable()
export class ConsultarEstudioRepository {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>,
    @InjectRepository(Estudio) private readonly estudios: Repository<Estudio>
  ) {}

  async consultarEstudioRepository(estudioId: number, minimo: number) {
    const estudio = await this.estudios.createQueryBuilder('h')
      .where('h.id = :estudioId', { estudioId }).getOne();
    const escenas = await this.escenas.createQueryBuilder('p')
      .innerJoin('p.estudio', 'h')
      .where('h.id = :estudioId', { estudioId })
      .andWhere('p.duracionSegundos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { estudio, escenas };
  }
}

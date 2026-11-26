import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../../aulas/entities/aula.entity';
import { Escuela } from '../entities/escuela.entity';

@Injectable()
export class ConsultarEscuelaRepository {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>,
    @InjectRepository(Escuela) private readonly escuelas: Repository<Escuela>
  ) {}

  async consultarEscuelaRepository(escuelaId: number, minimo: number) {
    const escuela = await this.escuelas.createQueryBuilder('h')
      .where('h.id = :escuelaId', { escuelaId }).getOne();
    const aulas = await this.aulas.createQueryBuilder('p')
      .innerJoin('p.escuela', 'h')
      .where('h.id = :escuelaId', { escuelaId })
      .andWhere('p.capacidad >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { escuela, aulas };
  }
}

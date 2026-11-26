import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../../programas/entities/programa.entity';
import { Emisora } from '../entities/emisora.entity';

@Injectable()
export class ConsultarEmisoraRepository {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>,
    @InjectRepository(Emisora) private readonly emisoras: Repository<Emisora>
  ) {}

  async consultarEmisoraRepository(emisoraId: number, minimo: number) {
    const emisora = await this.emisoras.createQueryBuilder('h')
      .where('h.id = :emisoraId', { emisoraId }).getOne();
    const programas = await this.programas.createQueryBuilder('p')
      .innerJoin('p.emisora', 'h')
      .where('h.id = :emisoraId', { emisoraId })
      .andWhere('p.duracionMinutos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { emisora, programas };
  }
}

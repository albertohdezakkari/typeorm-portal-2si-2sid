import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../../plantas/entities/planta.entity';
import { Vivero } from '../entities/vivero.entity';

@Injectable()
export class ConsultarViveroRepository {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>,
    @InjectRepository(Vivero) private readonly viveros: Repository<Vivero>
  ) {}

  async consultarViveroRepository(viveroId: number, minimo: number) {
    const vivero = await this.viveros.createQueryBuilder('h')
      .where('h.id = :viveroId', { viveroId }).getOne();
    const plantas = await this.plantas.createQueryBuilder('p')
      .innerJoin('p.vivero', 'h')
      .where('h.id = :viveroId', { viveroId })
      .andWhere('p.alturaCm >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { vivero, plantas };
  }
}

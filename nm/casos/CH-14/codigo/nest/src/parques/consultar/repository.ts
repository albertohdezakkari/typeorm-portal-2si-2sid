import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from '../../zonas/entities/zona.entity';
import { Parque } from '../entities/parque.entity';

@Injectable()
export class ConsultarParqueRepository {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>,
    @InjectRepository(Parque) private readonly parques: Repository<Parque>
  ) {}

  async consultarParqueRepository(parqueId: number, minimo: number) {
    const parque = await this.parques.createQueryBuilder('h')
      .where('h.id = :parqueId', { parqueId }).getOne();
    const zonas = await this.zonas.createQueryBuilder('p')
      .innerJoin('p.parque', 'h')
      .where('h.id = :parqueId', { parqueId })
      .andWhere('p.capacidad >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { parque, zonas };
  }
}

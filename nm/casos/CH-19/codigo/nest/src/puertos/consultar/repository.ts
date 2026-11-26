import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embarcacion } from '../../embarcaciones/entities/embarcacion.entity';
import { Puerto } from '../entities/puerto.entity';

@Injectable()
export class ConsultarPuertoRepository {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>,
    @InjectRepository(Puerto) private readonly puertos: Repository<Puerto>
  ) {}

  async consultarPuertoRepository(puertoId: number, minimo: number) {
    const puerto = await this.puertos.createQueryBuilder('h')
      .where('h.id = :puertoId', { puertoId }).getOne();
    const embarcaciones = await this.embarcaciones.createQueryBuilder('p')
      .innerJoin('p.puerto', 'h')
      .where('h.id = :puertoId', { puertoId })
      .andWhere('p.esloraMetros >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { puerto, embarcaciones };
  }
}

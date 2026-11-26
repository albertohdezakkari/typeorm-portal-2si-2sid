import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../../reparaciones/entities/reparacion.entity';
import { Taller } from '../entities/taller.entity';

@Injectable()
export class ConsultarTallerRepository {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>,
    @InjectRepository(Taller) private readonly talleres: Repository<Taller>
  ) {}

  async consultarTallerRepository(tallerId: number, minimo: number) {
    const taller = await this.talleres.createQueryBuilder('h')
      .where('h.id = :tallerId', { tallerId }).getOne();
    const reparaciones = await this.reparaciones.createQueryBuilder('p')
      .innerJoin('p.taller', 'h')
      .where('h.id = :tallerId', { tallerId })
      .andWhere('p.costeCentimos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { taller, reparaciones };
  }
}

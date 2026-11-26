import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from '../../comandas/entities/comanda.entity';
import { Cafeteria } from '../entities/cafeteria.entity';

@Injectable()
export class ConsultarCafeteriaRepository {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>,
    @InjectRepository(Cafeteria) private readonly cafeterias: Repository<Cafeteria>
  ) {}

  async consultarCafeteriaRepository(cafeteriaId: number, minimo: number) {
    const cafeteria = await this.cafeterias.createQueryBuilder('h')
      .where('h.id = :cafeteriaId', { cafeteriaId }).getOne();
    const comandas = await this.comandas.createQueryBuilder('p')
      .innerJoin('p.cafeteria', 'h')
      .where('h.id = :cafeteriaId', { cafeteriaId })
      .andWhere('p.importeCentimos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { cafeteria, comandas };
  }
}

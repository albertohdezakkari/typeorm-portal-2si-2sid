import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from '../../obras/entities/obra.entity';
import { Ayuntamiento } from '../entities/ayuntamiento.entity';

@Injectable()
export class ConsultarAyuntamientoRepository {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>,
    @InjectRepository(Ayuntamiento) private readonly ayuntamientos: Repository<Ayuntamiento>
  ) {}

  async consultarAyuntamientoRepository(ayuntamientoId: number, minimo: number) {
    const ayuntamiento = await this.ayuntamientos.createQueryBuilder('h')
      .where('h.id = :ayuntamientoId', { ayuntamientoId }).getOne();
    const obras = await this.obras.createQueryBuilder('p')
      .innerJoin('p.ayuntamiento', 'h')
      .where('h.id = :ayuntamientoId', { ayuntamientoId })
      .andWhere('p.presupuestoEuros >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { ayuntamiento, obras };
  }
}

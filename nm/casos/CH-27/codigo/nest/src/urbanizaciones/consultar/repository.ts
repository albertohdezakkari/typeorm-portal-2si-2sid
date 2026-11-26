import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaza } from '../../plazas/entities/plaza.entity';
import { Urbanizacion } from '../entities/urbanizacion.entity';

@Injectable()
export class ConsultarUrbanizacionRepository {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>,
    @InjectRepository(Urbanizacion) private readonly urbanizaciones: Repository<Urbanizacion>
  ) {}

  async consultarUrbanizacionRepository(urbanizacionId: number, minimo: number) {
    const urbanizacion = await this.urbanizaciones.createQueryBuilder('h')
      .where('h.id = :urbanizacionId', { urbanizacionId }).getOne();
    const plazas = await this.plazas.createQueryBuilder('p')
      .innerJoin('p.urbanizacion', 'h')
      .where('h.id = :urbanizacionId', { urbanizacionId })
      .andWhere('p.superficieM2 >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { urbanizacion, plazas };
  }
}

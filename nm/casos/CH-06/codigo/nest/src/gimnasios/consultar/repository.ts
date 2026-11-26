import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from '../../sesiones/entities/sesion.entity';
import { Gimnasio } from '../entities/gimnasio.entity';

@Injectable()
export class ConsultarGimnasioRepository {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>,
    @InjectRepository(Gimnasio) private readonly gimnasios: Repository<Gimnasio>
  ) {}

  async consultarGimnasioRepository(gimnasioId: number, minimo: number) {
    const gimnasio = await this.gimnasios.createQueryBuilder('h')
      .where('h.id = :gimnasioId', { gimnasioId }).getOne();
    const sesiones = await this.sesiones.createQueryBuilder('p')
      .innerJoin('p.gimnasio', 'h')
      .where('h.id = :gimnasioId', { gimnasioId })
      .andWhere('p.plazas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { gimnasio, sesiones };
  }
}

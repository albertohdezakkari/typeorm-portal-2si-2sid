import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyeccion } from '../../proyecciones/entities/proyeccion.entity';
import { Cine } from '../entities/cine.entity';

@Injectable()
export class ConsultarCineRepository {
  constructor(
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>,
    @InjectRepository(Cine) private readonly cines: Repository<Cine>
  ) {}

  async consultarCineRepository(cineId: number, minimo: number) {
    const cine = await this.cines.createQueryBuilder('h')
      .where('h.id = :cineId', { cineId }).getOne();
    const proyecciones = await this.proyecciones.createQueryBuilder('p')
      .innerJoin('p.cine', 'h')
      .where('h.id = :cineId', { cineId })
      .andWhere('p.duracionMinutos >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { cine, proyecciones };
  }
}

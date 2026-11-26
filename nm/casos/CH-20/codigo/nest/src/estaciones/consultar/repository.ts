import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trayecto } from '../../trayectos/entities/trayecto.entity';
import { Estacion } from '../entities/estacion.entity';

@Injectable()
export class ConsultarEstacionRepository {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>,
    @InjectRepository(Estacion) private readonly estaciones: Repository<Estacion>
  ) {}

  async consultarEstacionRepository(estacionId: number, minimo: number) {
    const estacion = await this.estaciones.createQueryBuilder('h')
      .where('h.id = :estacionId', { estacionId }).getOne();
    const trayectos = await this.trayectos.createQueryBuilder('p')
      .innerJoin('p.estacion', 'h')
      .where('h.id = :estacionId', { estacionId })
      .andWhere('p.distanciaKm >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { estacion, trayectos };
  }
}

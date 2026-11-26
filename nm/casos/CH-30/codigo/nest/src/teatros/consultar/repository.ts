import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from '../../funciones/entities/funcion.entity';
import { Teatro } from '../entities/teatro.entity';

@Injectable()
export class ConsultarTeatroRepository {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>,
    @InjectRepository(Teatro) private readonly teatros: Repository<Teatro>
  ) {}

  async consultarTeatroRepository(teatroId: number, minimo: number) {
    const teatro = await this.teatros.createQueryBuilder('h')
      .where('h.id = :teatroId', { teatroId }).getOne();
    const funciones = await this.funciones.createQueryBuilder('p')
      .innerJoin('p.teatro', 'h')
      .where('h.id = :teatroId', { teatroId })
      .andWhere('p.aforo >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { teatro, funciones };
  }
}

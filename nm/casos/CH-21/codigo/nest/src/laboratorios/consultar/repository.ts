import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muestra } from '../../muestras/entities/muestra.entity';
import { Laboratorio } from '../entities/laboratorio.entity';

@Injectable()
export class ConsultarLaboratorioRepository {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>,
    @InjectRepository(Laboratorio) private readonly laboratorios: Repository<Laboratorio>
  ) {}

  async consultarLaboratorioRepository(laboratorioId: number, minimo: number) {
    const laboratorio = await this.laboratorios.createQueryBuilder('h')
      .where('h.id = :laboratorioId', { laboratorioId }).getOne();
    const muestras = await this.muestras.createQueryBuilder('p')
      .innerJoin('p.laboratorio', 'h')
      .where('h.id = :laboratorioId', { laboratorioId })
      .andWhere('p.cantidadMl >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { laboratorio, muestras };
  }
}

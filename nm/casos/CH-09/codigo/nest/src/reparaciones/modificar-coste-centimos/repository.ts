import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparacion.entity';

@Injectable()
export class ModificarCosteCentimosRepository {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>
  ) {}

  async modificarCosteCentimosRepository(reparacionId: number, costeCentimos: number) {
    await this.reparaciones.update(reparacionId, { costeCentimos });
    return this.reparaciones.createQueryBuilder('p')
      .where('p.id = :reparacionId', { reparacionId }).getOne();
  }
}

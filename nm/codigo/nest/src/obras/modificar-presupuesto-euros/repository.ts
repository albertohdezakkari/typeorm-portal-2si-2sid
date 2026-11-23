import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from '../entities/obra.entity';

@Injectable()
export class ModificarPresupuestoEurosRepository {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>
  ) {}

  async modificarPresupuestoEurosRepository(obraId: number, presupuestoEuros: number) {
    await this.obras.update(obraId, { presupuestoEuros });
    return this.obras.createQueryBuilder('p')
      .where('p.id = :obraId', { obraId }).getOne();
  }
}

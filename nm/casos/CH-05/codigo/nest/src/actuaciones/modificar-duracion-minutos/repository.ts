import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actuacion } from '../entities/actuacion.entity';

@Injectable()
export class ModificarDuracionMinutosRepository {
  constructor(
    @InjectRepository(Actuacion) private readonly actuaciones: Repository<Actuacion>
  ) {}

  async modificarDuracionMinutosRepository(actuacionId: number, duracionMinutos: number) {
    await this.actuaciones.update(actuacionId, { duracionMinutos });
    return this.actuaciones.createQueryBuilder('p')
      .where('p.id = :actuacionId', { actuacionId }).getOne();
  }
}

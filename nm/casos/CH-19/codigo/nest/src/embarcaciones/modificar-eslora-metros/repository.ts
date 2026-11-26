import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embarcacion } from '../entities/embarcacion.entity';

@Injectable()
export class ModificarEsloraMetrosRepository {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>
  ) {}

  async modificarEsloraMetrosRepository(embarcacionId: number, esloraMetros: number) {
    await this.embarcaciones.update(embarcacionId, { esloraMetros });
    return this.embarcaciones.createQueryBuilder('p')
      .where('p.id = :embarcacionId', { embarcacionId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embarcacion } from '../entities/embarcacion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>
  ) {}

  async trasladarEmbarcacionRepository(embarcacionId: number, puertoId: number) {
    await this.embarcaciones.update(embarcacionId, { puerto: { id: puertoId } });
    return this.embarcaciones.createQueryBuilder('p')
      .where('p.id = :embarcacionId', { embarcacionId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escena } from '../entities/escena.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>
  ) {}

  async trasladarEscenaRepository(escenaId: number, estudioId: number) {
    await this.escenas.update(escenaId, { estudio: { id: estudioId } });
    return this.escenas.createQueryBuilder('p')
      .where('p.id = :escenaId', { escenaId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from '../entities/obra.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>
  ) {}

  async trasladarObraRepository(obraId: number, ayuntamientoId: number) {
    await this.obras.update(obraId, { ayuntamiento: { id: ayuntamientoId } });
    return this.obras.createQueryBuilder('p')
      .where('p.id = :obraId', { obraId }).getOne();
  }
}

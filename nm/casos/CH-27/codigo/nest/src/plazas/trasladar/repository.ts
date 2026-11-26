import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaza } from '../entities/plaza.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>
  ) {}

  async trasladarPlazaRepository(plazaId: number, urbanizacionId: number) {
    await this.plazas.update(plazaId, { urbanizacion: { id: urbanizacionId } });
    return this.plazas.createQueryBuilder('p')
      .where('p.id = :plazaId', { plazaId }).getOne();
  }
}

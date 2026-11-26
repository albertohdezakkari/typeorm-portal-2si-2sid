import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../entities/planta.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>
  ) {}

  async trasladarPlantaRepository(plantaId: number, viveroId: number) {
    await this.plantas.update(plantaId, { vivero: { id: viveroId } });
    return this.plantas.createQueryBuilder('p')
      .where('p.id = :plantaId', { plantaId }).getOne();
  }
}

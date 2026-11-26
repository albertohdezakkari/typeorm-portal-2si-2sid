import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../entities/planta.entity';

@Injectable()
export class ModificarAlturaCmRepository {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>
  ) {}

  async modificarAlturaCmRepository(plantaId: number, alturaCm: number) {
    await this.plantas.update(plantaId, { alturaCm });
    return this.plantas.createQueryBuilder('p')
      .where('p.id = :plantaId', { plantaId }).getOne();
  }
}

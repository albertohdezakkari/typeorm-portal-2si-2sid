import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from '../entities/zona.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>
  ) {}

  async trasladarZonaRepository(zonaId: number, parqueId: number) {
    await this.zonas.update(zonaId, { parque: { id: parqueId } });
    return this.zonas.createQueryBuilder('p')
      .where('p.id = :zonaId', { zonaId }).getOne();
  }
}

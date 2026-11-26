import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zona } from '../entities/zona.entity';

@Injectable()
export class ModificarCapacidadRepository {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>
  ) {}

  async modificarCapacidadRepository(zonaId: number, capacidad: number) {
    await this.zonas.update(zonaId, { capacidad });
    return this.zonas.createQueryBuilder('p')
      .where('p.id = :zonaId', { zonaId }).getOne();
  }
}

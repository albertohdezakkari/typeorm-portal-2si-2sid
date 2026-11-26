import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muestra } from '../entities/muestra.entity';

@Injectable()
export class ModificarCantidadMlRepository {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>
  ) {}

  async modificarCantidadMlRepository(muestraId: number, cantidadMl: number) {
    await this.muestras.update(muestraId, { cantidadMl });
    return this.muestras.createQueryBuilder('p')
      .where('p.id = :muestraId', { muestraId }).getOne();
  }
}

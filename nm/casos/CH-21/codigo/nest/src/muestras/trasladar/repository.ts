import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muestra } from '../entities/muestra.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>
  ) {}

  async trasladarMuestraRepository(muestraId: number, laboratorioId: number) {
    await this.muestras.update(muestraId, { laboratorio: { id: laboratorioId } });
    return this.muestras.createQueryBuilder('p')
      .where('p.id = :muestraId', { muestraId }).getOne();
  }
}

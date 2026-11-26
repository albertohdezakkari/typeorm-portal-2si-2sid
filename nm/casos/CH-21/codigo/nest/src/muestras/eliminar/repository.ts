import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Muestra } from '../entities/muestra.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>
  ) {}

  async eliminarMuestraRepository(muestraId: number) {
    await this.muestras.delete(muestraId);
  }
}

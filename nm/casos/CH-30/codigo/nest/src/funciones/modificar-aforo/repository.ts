import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from '../entities/funcion.entity';

@Injectable()
export class ModificarAforoRepository {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>
  ) {}

  async modificarAforoRepository(funcionId: number, aforo: number) {
    await this.funciones.update(funcionId, { aforo });
    return this.funciones.createQueryBuilder('p')
      .where('p.id = :funcionId', { funcionId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from '../entities/funcion.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>
  ) {}

  async trasladarFuncionRepository(funcionId: number, teatroId: number) {
    await this.funciones.update(funcionId, { teatro: { id: teatroId } });
    return this.funciones.createQueryBuilder('p')
      .where('p.id = :funcionId', { funcionId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from '../entities/comanda.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>
  ) {}

  async trasladarComandaRepository(comandaId: number, cafeteriaId: number) {
    await this.comandas.update(comandaId, { cafeteria: { id: cafeteriaId } });
    return this.comandas.createQueryBuilder('p')
      .where('p.id = :comandaId', { comandaId }).getOne();
  }
}

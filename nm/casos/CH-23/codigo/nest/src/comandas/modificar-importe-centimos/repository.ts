import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from '../entities/comanda.entity';

@Injectable()
export class ModificarImporteCentimosRepository {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>
  ) {}

  async modificarImporteCentimosRepository(comandaId: number, importeCentimos: number) {
    await this.comandas.update(comandaId, { importeCentimos });
    return this.comandas.createQueryBuilder('p')
      .where('p.id = :comandaId', { comandaId }).getOne();
  }
}

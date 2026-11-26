import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comanda } from '../entities/comanda.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Comanda) private readonly comandas: Repository<Comanda>
  ) {}

  async eliminarComandaRepository(comandaId: number) {
    await this.comandas.delete(comandaId);
  }
}

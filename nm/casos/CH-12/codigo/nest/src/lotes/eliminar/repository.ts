import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from '../entities/lote.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>
  ) {}

  async eliminarLoteRepository(loteId: number) {
    await this.lotes.delete(loteId);
  }
}

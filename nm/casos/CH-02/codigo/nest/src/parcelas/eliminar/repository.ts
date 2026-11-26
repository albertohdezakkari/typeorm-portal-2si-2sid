import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Parcela } from '../entities/parcela.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>
  ) {}

  async eliminarParcelaRepository(parcelaId: number) {
    await this.parcelas.delete(parcelaId);
  }
}

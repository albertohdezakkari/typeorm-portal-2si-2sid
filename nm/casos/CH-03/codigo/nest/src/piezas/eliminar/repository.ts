import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pieza } from '../entities/pieza.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Pieza) private readonly piezas: Repository<Pieza>
  ) {}

  async eliminarPiezaRepository(piezaId: number) {
    await this.piezas.delete(piezaId);
  }
}

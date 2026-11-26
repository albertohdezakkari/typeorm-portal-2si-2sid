import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from '../entities/pista.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>
  ) {}

  async eliminarPistaRepository(pistaId: number) {
    await this.pistas.delete(pistaId);
  }
}

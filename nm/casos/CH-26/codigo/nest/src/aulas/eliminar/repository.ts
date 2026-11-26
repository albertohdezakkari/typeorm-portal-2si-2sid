import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../entities/aula.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>
  ) {}

  async eliminarAulaRepository(aulaId: number) {
    await this.aulas.delete(aulaId);
  }
}

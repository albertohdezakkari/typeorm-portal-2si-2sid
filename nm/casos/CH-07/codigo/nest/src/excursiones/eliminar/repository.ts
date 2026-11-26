import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from '../entities/excursion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>
  ) {}

  async eliminarExcursionRepository(excursionId: number) {
    await this.excursiones.delete(excursionId);
  }
}

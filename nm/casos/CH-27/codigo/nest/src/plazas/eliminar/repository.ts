import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaza } from '../entities/plaza.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>
  ) {}

  async eliminarPlazaRepository(plazaId: number) {
    await this.plazas.delete(plazaId);
  }
}

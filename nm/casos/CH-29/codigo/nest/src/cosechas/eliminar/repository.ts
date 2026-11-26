import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cosecha } from '../entities/cosecha.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Cosecha) private readonly cosechas: Repository<Cosecha>
  ) {}

  async eliminarCosechaRepository(cosechaId: number) {
    await this.cosechas.delete(cosechaId);
  }
}

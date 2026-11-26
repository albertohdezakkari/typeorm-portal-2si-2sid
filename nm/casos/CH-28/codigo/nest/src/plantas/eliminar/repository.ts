import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Planta } from '../entities/planta.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>
  ) {}

  async eliminarPlantaRepository(plantaId: number) {
    await this.plantas.delete(plantaId);
  }
}

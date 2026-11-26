import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Embarcacion } from '../entities/embarcacion.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Embarcacion) private readonly embarcaciones: Repository<Embarcacion>
  ) {}

  async eliminarEmbarcacionRepository(embarcacionId: number) {
    await this.embarcaciones.delete(embarcacionId);
  }
}

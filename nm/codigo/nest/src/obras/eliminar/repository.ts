import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from '../entities/obra.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>
  ) {}

  async eliminarObraRepository(obraId: number) {
    await this.obras.delete(obraId);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escena } from '../entities/escena.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>
  ) {}

  async eliminarEscenaRepository(escenaId: number) {
    await this.escenas.delete(escenaId);
  }
}

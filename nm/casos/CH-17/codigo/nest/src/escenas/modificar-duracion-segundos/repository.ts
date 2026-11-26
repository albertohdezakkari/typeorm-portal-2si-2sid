import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escena } from '../entities/escena.entity';

@Injectable()
export class ModificarDuracionSegundosRepository {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>
  ) {}

  async modificarDuracionSegundosRepository(escenaId: number, duracionSegundos: number) {
    await this.escenas.update(escenaId, { duracionSegundos });
    return this.escenas.createQueryBuilder('p')
      .where('p.id = :escenaId', { escenaId }).getOne();
  }
}

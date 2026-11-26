import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../entities/programa.entity';

@Injectable()
export class ModificarDuracionMinutosRepository {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>
  ) {}

  async modificarDuracionMinutosRepository(programaId: number, duracionMinutos: number) {
    await this.programas.update(programaId, { duracionMinutos });
    return this.programas.createQueryBuilder('p')
      .where('p.id = :programaId', { programaId }).getOne();
  }
}

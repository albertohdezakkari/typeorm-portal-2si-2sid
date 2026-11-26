import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../entities/programa.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>
  ) {}

  async trasladarProgramaRepository(programaId: number, emisoraId: number) {
    await this.programas.update(programaId, { emisora: { id: emisoraId } });
    return this.programas.createQueryBuilder('p')
      .where('p.id = :programaId', { programaId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../entities/programa.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>
  ) {}

  async eliminarProgramaRepository(programaId: number) {
    await this.programas.delete(programaId);
  }
}

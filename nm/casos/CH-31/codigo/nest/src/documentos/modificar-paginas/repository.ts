import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../entities/documento.entity';

@Injectable()
export class ModificarPaginasRepository {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>
  ) {}

  async modificarPaginasRepository(documentoId: number, paginas: number) {
    await this.documentos.update(documentoId, { paginas });
    return this.documentos.createQueryBuilder('p')
      .where('p.id = :documentoId', { documentoId }).getOne();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../entities/documento.entity';

@Injectable()
export class TrasladarRepository {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>
  ) {}

  async trasladarDocumentoRepository(documentoId: number, archivoId: number) {
    await this.documentos.update(documentoId, { archivo: { id: archivoId } });
    return this.documentos.createQueryBuilder('p')
      .where('p.id = :documentoId', { documentoId }).getOne();
  }
}

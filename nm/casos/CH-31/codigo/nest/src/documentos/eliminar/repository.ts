import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../entities/documento.entity';

@Injectable()
export class EliminarRepository {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>
  ) {}

  async eliminarDocumentoRepository(documentoId: number) {
    await this.documentos.delete(documentoId);
  }
}

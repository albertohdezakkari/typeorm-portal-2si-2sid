import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../entities/documento.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>
  ) {}

  crearDocumentoRepository(nombre: string, paginas: number, archivoId: number) {
    const documento = this.documentos.create({
      nombre, paginas, archivo: { id: archivoId }
    });
    return this.documentos.save(documento);
  }

  listarDocumentosRepository() {
    return this.documentos.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

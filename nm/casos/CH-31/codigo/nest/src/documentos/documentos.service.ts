import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Documento } from './entities/documento.entity';
import { Archivo } from '../archivos/entities/archivo.entity';

@Injectable()
export class DocumentosService {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>,
    @InjectRepository(Archivo) private readonly archivos: Repository<Archivo>
  ) {}

  crearDocumento(nombre: string, paginas: number, archivoId: number) {
    const documento = this.documentos.create({
      nombre,
      paginas,
      archivo: { id: archivoId }
    });
    return this.documentos.save(documento);
  }

  listarDocumentos() {
    return this.documentos.find({ relations: { archivo: true }, order: { id: 'ASC' } });
  }

  async eliminarDocumento(documentoId: number) {
    await this.documentos.delete(documentoId);
  }

  async modificarPaginas(documentoId: number, paginas: number) {
    await this.documentos.update(documentoId, { paginas });
    return this.documentos.findOneBy({ id: documentoId });
  }

  async cambiarArchivo(documentoId: number, archivoId: number) {
    await this.documentos.update(documentoId, { archivo: { id: archivoId } });
    return this.documentos.findOneBy({ id: documentoId });
  }

  async consultarArchivo(archivoId: number, minimo: number) {
    const archivo = await this.archivos.findOneBy({ id: archivoId });
    const documentos = await this.documentos.find({
      where: {
        archivo: { id: archivoId },
        paginas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { archivo, documentos };
  }
}

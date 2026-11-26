import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Documento } from '../../documentos/entities/documento.entity';
import { Archivo } from '../entities/archivo.entity';

@Injectable()
export class ConsultarArchivoRepository {
  constructor(
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>,
    @InjectRepository(Archivo) private readonly archivos: Repository<Archivo>
  ) {}

  async consultarArchivoRepository(archivoId: number, minimo: number) {
    const archivo = await this.archivos.createQueryBuilder('h')
      .where('h.id = :archivoId', { archivoId }).getOne();
    const documentos = await this.documentos.createQueryBuilder('p')
      .innerJoin('p.archivo', 'h')
      .where('h.id = :archivoId', { archivoId })
      .andWhere('p.paginas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { archivo, documentos };
  }
}

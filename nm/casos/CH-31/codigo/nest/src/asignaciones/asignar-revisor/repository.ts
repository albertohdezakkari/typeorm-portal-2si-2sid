import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Documento } from '../../documentos/entities/documento.entity';
import { Revisor } from '../../revisores/entities/revisor.entity';

@Injectable()
export class AsignarRevisorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Documento) private readonly documentos: Repository<Documento>,
    @InjectRepository(Revisor) private readonly revisores: Repository<Revisor>
  ) {}

  buscarDocumentoRepository(documentoId: number) {
    return this.documentos.findOneBy({ id: documentoId });
  }

  buscarRevisorRepository(revisorId: number) {
    return this.revisores.findOneBy({ id: revisorId });
  }

  async asignarRevisorRepository(documentoId: number, revisorId: number, rol: string) {
    const asignacion = { documentoId, revisorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

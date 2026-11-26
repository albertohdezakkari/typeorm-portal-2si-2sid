import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Lote } from '../../lotes/entities/lote.entity';
import { Inspector } from '../../inspectores/entities/inspector.entity';

@Injectable()
export class AsignarInspectorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Lote) private readonly lotes: Repository<Lote>,
    @InjectRepository(Inspector) private readonly inspectores: Repository<Inspector>
  ) {}

  buscarLoteRepository(loteId: number) {
    return this.lotes.findOneBy({ id: loteId });
  }

  buscarInspectorRepository(inspectorId: number) {
    return this.inspectores.findOneBy({ id: inspectorId });
  }

  async asignarInspectorRepository(loteId: number, inspectorId: number, rol: string) {
    const asignacion = { loteId, inspectorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

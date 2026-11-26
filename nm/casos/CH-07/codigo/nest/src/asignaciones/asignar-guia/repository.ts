import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Excursion } from '../../excursiones/entities/excursion.entity';
import { Guia } from '../../guias/entities/guia.entity';

@Injectable()
export class AsignarGuiaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>,
    @InjectRepository(Guia) private readonly guias: Repository<Guia>
  ) {}

  buscarExcursionRepository(excursionId: number) {
    return this.excursiones.findOneBy({ id: excursionId });
  }

  buscarGuiaRepository(guiaId: number) {
    return this.guias.findOneBy({ id: guiaId });
  }

  async asignarGuiaRepository(excursionId: number, guiaId: number, rol: string) {
    const asignacion = { excursionId, guiaId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

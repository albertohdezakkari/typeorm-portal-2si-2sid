import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Muestra } from '../../muestras/entities/muestra.entity';
import { Analista } from '../../analistas/entities/analista.entity';

@Injectable()
export class AsignarAnalistaRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Muestra) private readonly muestras: Repository<Muestra>,
    @InjectRepository(Analista) private readonly analistas: Repository<Analista>
  ) {}

  buscarMuestraRepository(muestraId: number) {
    return this.muestras.findOneBy({ id: muestraId });
  }

  buscarAnalistaRepository(analistaId: number) {
    return this.analistas.findOneBy({ id: analistaId });
  }

  async asignarAnalistaRepository(muestraId: number, analistaId: number, rol: string) {
    const asignacion = { muestraId, analistaId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

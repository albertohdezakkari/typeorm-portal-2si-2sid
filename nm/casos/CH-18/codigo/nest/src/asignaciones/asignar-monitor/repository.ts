import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Monitor } from '../../monitores/entities/monitor.entity';

@Injectable()
export class AsignarMonitorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>,
    @InjectRepository(Monitor) private readonly monitores: Repository<Monitor>
  ) {}

  buscarActividadRepository(actividadId: number) {
    return this.actividades.findOneBy({ id: actividadId });
  }

  buscarMonitorRepository(monitorId: number) {
    return this.monitores.findOneBy({ id: monitorId });
  }

  async asignarMonitorRepository(actividadId: number, monitorId: number, rol: string) {
    const asignacion = { actividadId, monitorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

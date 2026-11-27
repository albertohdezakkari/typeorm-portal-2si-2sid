import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Actividad } from '../actividades/entities/actividad.entity';
import { Monitor } from '../monitores/entities/monitor.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>,
    @InjectRepository(Monitor) private readonly monitores: Repository<Monitor>
  ) {}

  crearMonitor(nombre: string, apellidos: string, email: string) {
    const monitor = this.monitores.create({ nombre, apellidos, email });
    return this.monitores.save(monitor);
  }

  listarMonitores() {
    return this.monitores.find({ order: { id: 'ASC' } });
  }

  async asignarMonitor(actividadId: number, monitorId: number, rol: string) {
    const actividad = await this.actividades.findOneBy({ id: actividadId });
    const monitor = await this.monitores.findOneBy({ id: monitorId });
    if (!actividad || !monitor) {
      throw new NotFoundException('No existe la actividad o el monitor');
    }
    const asignacion = { actividadId, monitorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El monitor ya está asignado a esa actividad');
      }
      throw error;
    }
  }

  listarPorActividad(actividadId: number) {
    return this.asignaciones.find({ where: { actividadId }, order: { monitorId: 'ASC' } });
  }

  listarPorMonitor(monitorId: number) {
    return this.asignaciones.find({ where: { monitorId }, order: { actividadId: 'ASC' } });
  }

  async modificarRol(actividadId: number, monitorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ actividadId, monitorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { actividadId, monitorId, rol };
  }

  async eliminarAsignacion(actividadId: number, monitorId: number) {
    await this.asignaciones.delete({ actividadId, monitorId });
  }
}

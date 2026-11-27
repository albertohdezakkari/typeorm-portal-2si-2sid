import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Reparacion } from '../reparaciones/entities/reparacion.entity';
import { Mecanico } from '../mecanicos/entities/mecanico.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>,
    @InjectRepository(Mecanico) private readonly mecanicos: Repository<Mecanico>
  ) {}

  crearMecanico(nombre: string, apellidos: string, email: string) {
    const mecanico = this.mecanicos.create({ nombre, apellidos, email });
    return this.mecanicos.save(mecanico);
  }

  listarMecanicos() {
    return this.mecanicos.find({ order: { id: 'ASC' } });
  }

  async asignarMecanico(reparacionId: number, mecanicoId: number, rol: string) {
    const reparacion = await this.reparaciones.findOneBy({ id: reparacionId });
    const mecanico = await this.mecanicos.findOneBy({ id: mecanicoId });
    if (!reparacion || !mecanico) {
      throw new NotFoundException('No existe la reparacion o el mecanico');
    }
    const asignacion = { reparacionId, mecanicoId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El mecanico ya está asignado a esa reparacion');
      }
      throw error;
    }
  }

  listarPorReparacion(reparacionId: number) {
    return this.asignaciones.find({ where: { reparacionId }, order: { mecanicoId: 'ASC' } });
  }

  listarPorMecanico(mecanicoId: number) {
    return this.asignaciones.find({ where: { mecanicoId }, order: { reparacionId: 'ASC' } });
  }

  async modificarRol(reparacionId: number, mecanicoId: number, rol: string) {
    const resultado = await this.asignaciones.update({ reparacionId, mecanicoId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { reparacionId, mecanicoId, rol };
  }

  async eliminarAsignacion(reparacionId: number, mecanicoId: number) {
    await this.asignaciones.delete({ reparacionId, mecanicoId });
  }
}

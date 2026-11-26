import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Trayecto } from '../../trayectos/entities/trayecto.entity';
import { Conductor } from '../../conductores/entities/conductor.entity';

@Injectable()
export class AsignarConductorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>,
    @InjectRepository(Conductor) private readonly conductores: Repository<Conductor>
  ) {}

  buscarTrayectoRepository(trayectoId: number) {
    return this.trayectos.findOneBy({ id: trayectoId });
  }

  buscarConductorRepository(conductorId: number) {
    return this.conductores.findOneBy({ id: conductorId });
  }

  async asignarConductorRepository(trayectoId: number, conductorId: number, rol: string) {
    const asignacion = { trayectoId, conductorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

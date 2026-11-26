import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Reparacion } from '../../reparaciones/entities/reparacion.entity';
import { Mecanico } from '../../mecanicos/entities/mecanico.entity';

@Injectable()
export class AsignarMecanicoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>,
    @InjectRepository(Mecanico) private readonly mecanicos: Repository<Mecanico>
  ) {}

  buscarReparacionRepository(reparacionId: number) {
    return this.reparaciones.findOneBy({ id: reparacionId });
  }

  buscarMecanicoRepository(mecanicoId: number) {
    return this.mecanicos.findOneBy({ id: mecanicoId });
  }

  async asignarMecanicoRepository(reparacionId: number, mecanicoId: number, rol: string) {
    const asignacion = { reparacionId, mecanicoId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

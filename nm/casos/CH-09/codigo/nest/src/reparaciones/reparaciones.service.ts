import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Reparacion } from './entities/reparacion.entity';
import { Taller } from '../talleres/entities/taller.entity';

@Injectable()
export class ReparacionesService {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>,
    @InjectRepository(Taller) private readonly talleres: Repository<Taller>
  ) {}

  crearReparacion(nombre: string, costeCentimos: number, tallerId: number) {
    const reparacion = this.reparaciones.create({
      nombre,
      costeCentimos,
      taller: { id: tallerId }
    });
    return this.reparaciones.save(reparacion);
  }

  listarReparaciones() {
    return this.reparaciones.find({ order: { id: 'ASC' } });
  }

  async eliminarReparacion(reparacionId: number) {
    await this.reparaciones.delete(reparacionId);
  }

  async modificarCosteCentimos(reparacionId: number, costeCentimos: number) {
    await this.reparaciones.update(reparacionId, { costeCentimos });
    return this.reparaciones.findOneBy({ id: reparacionId });
  }

  async cambiarTaller(reparacionId: number, tallerId: number) {
    await this.reparaciones.update(reparacionId, { taller: { id: tallerId } });
    return this.reparaciones.findOneBy({ id: reparacionId });
  }

  async consultarTaller(tallerId: number, minimo: number) {
    const taller = await this.talleres.findOneBy({ id: tallerId });
    const reparaciones = await this.reparaciones.find({
      where: {
        taller: { id: tallerId },
        costeCentimos: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { taller, reparaciones };
  }
}

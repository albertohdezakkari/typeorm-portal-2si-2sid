import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Planta } from './entities/planta.entity';
import { Vivero } from '../viveros/entities/vivero.entity';

@Injectable()
export class PlantasService {
  constructor(
    @InjectRepository(Planta) private readonly plantas: Repository<Planta>,
    @InjectRepository(Vivero) private readonly viveros: Repository<Vivero>
  ) {}

  crearPlanta(nombre: string, alturaCm: number, viveroId: number) {
    const planta = this.plantas.create({
      nombre,
      alturaCm,
      vivero: { id: viveroId }
    });
    return this.plantas.save(planta);
  }

  listarPlantas() {
    return this.plantas.find({ relations: { vivero: true }, order: { id: 'ASC' } });
  }

  async eliminarPlanta(plantaId: number) {
    await this.plantas.delete(plantaId);
  }

  async modificarAlturaCm(plantaId: number, alturaCm: number) {
    await this.plantas.update(plantaId, { alturaCm });
    return this.plantas.findOneBy({ id: plantaId });
  }

  async cambiarVivero(plantaId: number, viveroId: number) {
    await this.plantas.update(plantaId, { vivero: { id: viveroId } });
    return this.plantas.findOneBy({ id: plantaId });
  }

  async consultarVivero(viveroId: number, minimo: number) {
    const vivero = await this.viveros.findOneBy({ id: viveroId });
    const plantas = await this.plantas.find({
      where: {
        vivero: { id: viveroId },
        alturaCm: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { vivero, plantas };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Plaza } from './entities/plaza.entity';
import { Urbanizacion } from '../urbanizaciones/entities/urbanizacion.entity';

@Injectable()
export class PlazasService {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>,
    @InjectRepository(Urbanizacion) private readonly urbanizaciones: Repository<Urbanizacion>
  ) {}

  crearPlaza(nombre: string, superficieM2: number, urbanizacionId: number) {
    const plaza = this.plazas.create({
      nombre,
      superficieM2,
      urbanizacion: { id: urbanizacionId }
    });
    return this.plazas.save(plaza);
  }

  listarPlazas() {
    return this.plazas.find({ order: { id: 'ASC' } });
  }

  async eliminarPlaza(plazaId: number) {
    await this.plazas.delete(plazaId);
  }

  async modificarSuperficieM2(plazaId: number, superficieM2: number) {
    await this.plazas.update(plazaId, { superficieM2 });
    return this.plazas.findOneBy({ id: plazaId });
  }

  async cambiarUrbanizacion(plazaId: number, urbanizacionId: number) {
    await this.plazas.update(plazaId, { urbanizacion: { id: urbanizacionId } });
    return this.plazas.findOneBy({ id: plazaId });
  }

  async consultarUrbanizacion(urbanizacionId: number, minimo: number) {
    const urbanizacion = await this.urbanizaciones.findOneBy({ id: urbanizacionId });
    const plazas = await this.plazas.find({
      where: {
        urbanizacion: { id: urbanizacionId },
        superficieM2: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { urbanizacion, plazas };
  }
}

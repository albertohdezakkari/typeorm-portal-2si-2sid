import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Zona } from './entities/zona.entity';
import { Parque } from '../parques/entities/parque.entity';

@Injectable()
export class ZonasService {
  constructor(
    @InjectRepository(Zona) private readonly zonas: Repository<Zona>,
    @InjectRepository(Parque) private readonly parques: Repository<Parque>
  ) {}

  crearZona(nombre: string, capacidad: number, parqueId: number) {
    const zona = this.zonas.create({
      nombre,
      capacidad,
      parque: { id: parqueId }
    });
    return this.zonas.save(zona);
  }

  listarZonas() {
    return this.zonas.find({ relations: { parque: true }, order: { id: 'ASC' } });
  }

  async eliminarZona(zonaId: number) {
    await this.zonas.delete(zonaId);
  }

  async modificarCapacidad(zonaId: number, capacidad: number) {
    await this.zonas.update(zonaId, { capacidad });
    return this.zonas.findOneBy({ id: zonaId });
  }

  async cambiarParque(zonaId: number, parqueId: number) {
    await this.zonas.update(zonaId, { parque: { id: parqueId } });
    return this.zonas.findOneBy({ id: zonaId });
  }

  async consultarParque(parqueId: number, minimo: number) {
    const parque = await this.parques.findOneBy({ id: parqueId });
    const zonas = await this.zonas.find({
      where: {
        parque: { id: parqueId },
        capacidad: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { parque, zonas };
  }
}

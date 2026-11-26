import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trayecto } from '../entities/trayecto.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Trayecto) private readonly trayectos: Repository<Trayecto>
  ) {}

  crearTrayectoRepository(nombre: string, distanciaKm: number, estacionId: number) {
    const trayecto = this.trayectos.create({
      nombre, distanciaKm, estacion: { id: estacionId }
    });
    return this.trayectos.save(trayecto);
  }

  listarTrayectosRepository() {
    return this.trayectos.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

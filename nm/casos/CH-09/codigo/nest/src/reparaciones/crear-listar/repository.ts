import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reparacion } from '../entities/reparacion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Reparacion) private readonly reparaciones: Repository<Reparacion>
  ) {}

  crearReparacionRepository(nombre: string, costeCentimos: number, tallerId: number) {
    const reparacion = this.reparaciones.create({
      nombre, costeCentimos, taller: { id: tallerId }
    });
    return this.reparaciones.save(reparacion);
  }

  listarReparacionesRepository() {
    return this.reparaciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

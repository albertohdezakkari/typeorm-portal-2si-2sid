import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sesion } from '../entities/sesion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Sesion) private readonly sesiones: Repository<Sesion>
  ) {}

  crearSesionRepository(nombre: string, plazas: number, gimnasioId: number) {
    const sesion = this.sesiones.create({
      nombre, plazas, gimnasio: { id: gimnasioId }
    });
    return this.sesiones.save(sesion);
  }

  listarSesionesRepository() {
    return this.sesiones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actividad } from '../entities/actividad.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>
  ) {}

  crearActividadRepository(nombre: string, plazas: number, clubId: number) {
    const actividad = this.actividades.create({
      nombre, plazas, club: { id: clubId }
    });
    return this.actividades.save(actividad);
  }

  listarActividadesRepository() {
    return this.actividades.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

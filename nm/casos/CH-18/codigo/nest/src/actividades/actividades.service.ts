import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Actividad } from './entities/actividad.entity';
import { Club } from '../clubes/entities/club.entity';

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividad) private readonly actividades: Repository<Actividad>,
    @InjectRepository(Club) private readonly clubes: Repository<Club>
  ) {}

  crearActividad(nombre: string, plazas: number, clubId: number) {
    const actividad = this.actividades.create({
      nombre,
      plazas,
      club: { id: clubId }
    });
    return this.actividades.save(actividad);
  }

  listarActividades() {
    return this.actividades.find({ order: { id: 'ASC' } });
  }

  async eliminarActividad(actividadId: number) {
    await this.actividades.delete(actividadId);
  }

  async modificarPlazas(actividadId: number, plazas: number) {
    await this.actividades.update(actividadId, { plazas });
    return this.actividades.findOneBy({ id: actividadId });
  }

  async cambiarClub(actividadId: number, clubId: number) {
    await this.actividades.update(actividadId, { club: { id: clubId } });
    return this.actividades.findOneBy({ id: actividadId });
  }

  async consultarClub(clubId: number, minimo: number) {
    const club = await this.clubes.findOneBy({ id: clubId });
    const actividades = await this.actividades.find({
      where: {
        club: { id: clubId },
        plazas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { club, actividades };
  }
}

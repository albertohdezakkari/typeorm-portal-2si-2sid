import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';
import { Colaborador } from '../../colaboradores/entities/colaborador.entity';

@Injectable()
export class AsignarColaboradorRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>,
    @InjectRepository(Colaborador) private readonly colaboradores: Repository<Colaborador>
  ) {}

  buscarProyectoRepository(proyectoId: number) {
    return this.proyectos.findOneBy({ id: proyectoId });
  }

  buscarColaboradorRepository(colaboradorId: number) {
    return this.colaboradores.findOneBy({ id: colaboradorId });
  }

  async asignarColaboradorRepository(proyectoId: number, colaboradorId: number, rol: string) {
    const asignacion = { proyectoId, colaboradorId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

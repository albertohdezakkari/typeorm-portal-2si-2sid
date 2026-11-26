import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Proyeccion } from '../../proyecciones/entities/proyeccion.entity';
import { Tecnico } from '../../tecnicos/entities/tecnico.entity';

@Injectable()
export class AsignarTecnicoRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>,
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  buscarProyeccionRepository(proyeccionId: number) {
    return this.proyecciones.findOneBy({ id: proyeccionId });
  }

  buscarTecnicoRepository(tecnicoId: number) {
    return this.tecnicos.findOneBy({ id: tecnicoId });
  }

  async asignarTecnicoRepository(proyeccionId: number, tecnicoId: number, rol: string) {
    const asignacion = { proyeccionId, tecnicoId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

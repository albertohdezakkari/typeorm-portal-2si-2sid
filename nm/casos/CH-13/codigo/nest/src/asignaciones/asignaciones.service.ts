import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Proyeccion } from '../proyecciones/entities/proyeccion.entity';
import { Tecnico } from '../tecnicos/entities/tecnico.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Proyeccion) private readonly proyecciones: Repository<Proyeccion>,
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  crearTecnico(nombre: string, apellidos: string, email: string) {
    const tecnico = this.tecnicos.create({ nombre, apellidos, email });
    return this.tecnicos.save(tecnico);
  }

  listarTecnicos() {
    return this.tecnicos.find({ order: { id: 'ASC' } });
  }

  async asignarTecnico(proyeccionId: number, tecnicoId: number, rol: string) {
    const proyeccion = await this.proyecciones.findOneBy({ id: proyeccionId });
    const tecnico = await this.tecnicos.findOneBy({ id: tecnicoId });
    if (!proyeccion || !tecnico) {
      throw new NotFoundException('No existe la proyeccion o el tecnico');
    }
    const asignacion = { proyeccionId, tecnicoId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tecnico ya está asignado a esa proyeccion');
      }
      throw error;
    }
  }

  listarPorProyeccion(proyeccionId: number) {
    return this.asignaciones.find({ where: { proyeccionId }, order: { tecnicoId: 'ASC' } });
  }

  listarPorTecnico(tecnicoId: number) {
    return this.asignaciones.find({ where: { tecnicoId }, order: { proyeccionId: 'ASC' } });
  }

  async modificarRol(proyeccionId: number, tecnicoId: number, rol: string) {
    const resultado = await this.asignaciones.update({ proyeccionId, tecnicoId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { proyeccionId, tecnicoId, rol };
  }

  async eliminarAsignacion(proyeccionId: number, tecnicoId: number) {
    await this.asignaciones.delete({ proyeccionId, tecnicoId });
  }
}

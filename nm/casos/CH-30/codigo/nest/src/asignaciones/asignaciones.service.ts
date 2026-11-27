import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Funcion } from '../funciones/entities/funcion.entity';
import { Interprete } from '../interpretes/entities/interprete.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>,
    @InjectRepository(Interprete) private readonly interpretes: Repository<Interprete>
  ) {}

  async asignarInterprete(funcionId: number, interpreteId: number, rol: string) {
    const funcion = await this.funciones.findOneBy({ id: funcionId });
    const interprete = await this.interpretes.findOneBy({ id: interpreteId });
    if (!funcion || !interprete) {
      throw new NotFoundException('No existe la funcion o el interprete');
    }
    const asignacion = { funcionId, interpreteId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El interprete ya está asignado a esa funcion');
      }
      throw error;
    }
  }

  listarPorFuncion(funcionId: number) {
    return this.asignaciones.find({ where: { funcionId }, order: { interpreteId: 'ASC' } });
  }

  listarPorInterprete(interpreteId: number) {
    return this.asignaciones.find({ where: { interpreteId }, order: { funcionId: 'ASC' } });
  }

  async modificarRol(funcionId: number, interpreteId: number, rol: string) {
    const resultado = await this.asignaciones.update({ funcionId, interpreteId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { funcionId, interpreteId, rol };
  }

  async eliminarAsignacion(funcionId: number, interpreteId: number) {
    await this.asignaciones.delete({ funcionId, interpreteId });
  }
}

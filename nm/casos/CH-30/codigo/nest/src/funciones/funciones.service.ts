import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity';
import { Teatro } from '../teatros/entities/teatro.entity';

@Injectable()
export class FuncionesService {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>,
    @InjectRepository(Teatro) private readonly teatros: Repository<Teatro>
  ) {}

  crearFuncion(nombre: string, aforo: number, teatroId: number) {
    const funcion = this.funciones.create({
      nombre,
      aforo,
      teatro: { id: teatroId }
    });
    return this.funciones.save(funcion);
  }

  listarFunciones() {
    return this.funciones.find({ order: { id: 'ASC' } });
  }

  async eliminarFuncion(funcionId: number) {
    await this.funciones.delete(funcionId);
  }

  async modificarAforo(funcionId: number, aforo: number) {
    await this.funciones.update(funcionId, { aforo });
    return this.funciones.findOneBy({ id: funcionId });
  }

  async cambiarTeatro(funcionId: number, teatroId: number) {
    await this.funciones.update(funcionId, { teatro: { id: teatroId } });
    return this.funciones.findOneBy({ id: funcionId });
  }

  async consultarTeatro(teatroId: number, minimo: number) {
    const teatro = await this.teatros.findOneBy({ id: teatroId });
    const funciones = await this.funciones.find({
      where: {
        teatro: { id: teatroId },
        aforo: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { teatro, funciones };
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';
import { Funcion } from '../../funciones/entities/funcion.entity';
import { Interprete } from '../../interpretes/entities/interprete.entity';

@Injectable()
export class AsignarInterpreteRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>,
    @InjectRepository(Interprete) private readonly interpretes: Repository<Interprete>
  ) {}

  buscarFuncionRepository(funcionId: number) {
    return this.funciones.findOneBy({ id: funcionId });
  }

  buscarInterpreteRepository(interpreteId: number) {
    return this.interpretes.findOneBy({ id: interpreteId });
  }

  async asignarInterpreteRepository(funcionId: number, interpreteId: number, rol: string) {
    const asignacion = { funcionId, interpreteId, rol };
    await this.asignaciones.insert(asignacion);
    return asignacion;
  }
}

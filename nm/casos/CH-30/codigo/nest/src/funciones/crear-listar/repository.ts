import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from '../entities/funcion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Funcion) private readonly funciones: Repository<Funcion>
  ) {}

  crearFuncionRepository(nombre: string, aforo: number, teatroId: number) {
    const funcion = this.funciones.create({
      nombre, aforo, teatro: { id: teatroId }
    });
    return this.funciones.save(funcion);
  }

  listarFuncionesRepository() {
    return this.funciones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

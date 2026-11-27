import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Colaborador } from './entities/colaborador.entity';

@Injectable()
export class ColaboradoresService {
  constructor(
    @InjectRepository(Colaborador) private readonly colaboradores: Repository<Colaborador>
  ) {}

  crearColaborador(nombre: string, apellidos: string, email: string) {
    const colaborador = this.colaboradores.create({ nombre, apellidos, email });
    return this.colaboradores.save(colaborador);
  }

  listarColaboradores() {
    return this.colaboradores.find({ order: { id: 'ASC' } });
  }
}

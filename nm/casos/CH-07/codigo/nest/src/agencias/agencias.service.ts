import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agencia } from './entities/agencia.entity';

@Injectable()
export class AgenciasService {
  constructor(
    @InjectRepository(Agencia) private readonly agencias: Repository<Agencia>
  ) {}

  crearAgencia(nombre: string) {
    const agencia = this.agencias.create({ nombre });
    return this.agencias.save(agencia);
  }

  listarAgencias() {
    return this.agencias.find({ order: { id: 'ASC' } });
  }
}
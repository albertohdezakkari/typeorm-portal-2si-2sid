import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escuela } from './entities/escuela.entity';

@Injectable()
export class EscuelasService {
  constructor(
    @InjectRepository(Escuela) private readonly escuelas: Repository<Escuela>
  ) {}

  crearEscuela(nombre: string) {
    const escuela = this.escuelas.create({ nombre });
    return this.escuelas.save(escuela);
  }

  listarEscuelas() {
    return this.escuelas.find({ order: { id: 'ASC' } });
  }
}
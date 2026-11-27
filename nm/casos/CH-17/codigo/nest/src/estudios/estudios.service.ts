import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Estudio } from './entities/estudio.entity';

@Injectable()
export class EstudiosService {
  constructor(
    @InjectRepository(Estudio) private readonly estudios: Repository<Estudio>
  ) {}

  crearEstudio(nombre: string) {
    const estudio = this.estudios.create({ nombre });
    return this.estudios.save(estudio);
  }

  listarEstudios() {
    return this.estudios.find({ order: { id: 'ASC' } });
  }
}
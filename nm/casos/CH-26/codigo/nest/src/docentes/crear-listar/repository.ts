import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Docente } from '../entities/docente.entity';

@Injectable()
export class DocentesRepository {
  constructor(
    @InjectRepository(Docente) private readonly docentes: Repository<Docente>
  ) {}

  crearDocenteRepository(nombre: string, apellidos: string, email: string) {
    const docente = this.docentes.create({ nombre, apellidos, email });
    return this.docentes.save(docente);
  }

  listarDocentesRepository() {
    return this.docentes.find({ order: { id: 'ASC' } });
  }
}

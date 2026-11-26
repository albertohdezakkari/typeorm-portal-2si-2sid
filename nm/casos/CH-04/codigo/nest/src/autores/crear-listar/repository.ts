import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from '../entities/autor.entity';

@Injectable()
export class AutoresRepository {
  constructor(
    @InjectRepository(Autor) private readonly autores: Repository<Autor>
  ) {}

  crearAutorRepository(nombre: string, apellidos: string, email: string) {
    const autor = this.autores.create({ nombre, apellidos, email });
    return this.autores.save(autor);
  }

  listarAutoresRepository() {
    return this.autores.find({ order: { id: 'ASC' } });
  }
}

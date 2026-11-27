import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Autor } from './entities/autor.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autor) private readonly autores: Repository<Autor>
  ) {}

  crearAutor(nombre: string, apellidos: string, email: string) {
    const autor = this.autores.create({ nombre, apellidos, email });
    return this.autores.save(autor);
  }

  listarAutores() {
    return this.autores.find({ order: { id: 'ASC' } });
  }
}

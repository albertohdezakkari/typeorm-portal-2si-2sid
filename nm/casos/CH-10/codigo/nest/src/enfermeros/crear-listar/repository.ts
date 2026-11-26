import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enfermero } from '../entities/enfermero.entity';

@Injectable()
export class EnfermerosRepository {
  constructor(
    @InjectRepository(Enfermero) private readonly enfermeros: Repository<Enfermero>
  ) {}

  crearEnfermeroRepository(nombre: string, apellidos: string, email: string) {
    const enfermero = this.enfermeros.create({ nombre, apellidos, email });
    return this.enfermeros.save(enfermero);
  }

  listarEnfermerosRepository() {
    return this.enfermeros.find({ order: { id: 'ASC' } });
  }
}

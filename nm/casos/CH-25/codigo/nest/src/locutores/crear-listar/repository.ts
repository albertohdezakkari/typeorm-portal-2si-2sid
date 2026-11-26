import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locutor } from '../entities/locutor.entity';

@Injectable()
export class LocutoresRepository {
  constructor(
    @InjectRepository(Locutor) private readonly locutores: Repository<Locutor>
  ) {}

  crearLocutorRepository(nombre: string, apellidos: string, email: string) {
    const locutor = this.locutores.create({ nombre, apellidos, email });
    return this.locutores.save(locutor);
  }

  listarLocutoresRepository() {
    return this.locutores.find({ order: { id: 'ASC' } });
  }
}

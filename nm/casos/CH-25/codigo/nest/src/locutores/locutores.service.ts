import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Locutor } from './entities/locutor.entity';

@Injectable()
export class LocutoresService {
  constructor(
    @InjectRepository(Locutor) private readonly locutores: Repository<Locutor>
  ) {}

  crearLocutor(nombre: string, apellidos: string, email: string) {
    const locutor = this.locutores.create({ nombre, apellidos, email });
    return this.locutores.save(locutor);
  }

  listarLocutores() {
    return this.locutores.find({ order: { id: 'ASC' } });
  }
}

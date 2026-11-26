import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interprete } from '../entities/interprete.entity';

@Injectable()
export class InterpretesRepository {
  constructor(
    @InjectRepository(Interprete) private readonly interpretes: Repository<Interprete>
  ) {}

  crearInterpreteRepository(nombre: string, apellidos: string, email: string) {
    const interprete = this.interpretes.create({ nombre, apellidos, email });
    return this.interpretes.save(interprete);
  }

  listarInterpretesRepository() {
    return this.interpretes.find({ order: { id: 'ASC' } });
  }
}

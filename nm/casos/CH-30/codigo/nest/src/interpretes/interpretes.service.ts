import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interprete } from './entities/interprete.entity';

@Injectable()
export class InterpretesService {
  constructor(
    @InjectRepository(Interprete) private readonly interpretes: Repository<Interprete>
  ) {}

  crearInterprete(nombre: string, apellidos: string, email: string) {
    const interprete = this.interpretes.create({ nombre, apellidos, email });
    return this.interpretes.save(interprete);
  }

  listarInterpretes() {
    return this.interpretes.find({ order: { id: 'ASC' } });
  }
}

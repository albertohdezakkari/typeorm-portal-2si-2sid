import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Complejo } from './entities/complejo.entity';

@Injectable()
export class ComplejosService {
  constructor(
    @InjectRepository(Complejo) private readonly complejos: Repository<Complejo>
  ) {}

  crearComplejo(nombre: string) {
    const complejo = this.complejos.create({ nombre });
    return this.complejos.save(complejo);
  }

  listarComplejos() {
    return this.complejos.find({ order: { id: 'ASC' } });
  }
}
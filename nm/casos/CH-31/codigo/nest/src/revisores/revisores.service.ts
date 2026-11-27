import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revisor } from './entities/revisor.entity';

@Injectable()
export class RevisoresService {
  constructor(
    @InjectRepository(Revisor) private readonly revisores: Repository<Revisor>
  ) {}

  crearRevisor(nombre: string, apellidos: string, email: string) {
    const revisor = this.revisores.create({ nombre, apellidos, email });
    return this.revisores.save(revisor);
  }

  listarRevisores() {
    return this.revisores.find({ order: { id: 'ASC' } });
  }
}

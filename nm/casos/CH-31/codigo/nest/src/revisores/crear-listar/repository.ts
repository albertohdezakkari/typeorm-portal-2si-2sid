import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Revisor } from '../entities/revisor.entity';

@Injectable()
export class RevisoresRepository {
  constructor(
    @InjectRepository(Revisor) private readonly revisores: Repository<Revisor>
  ) {}

  crearRevisorRepository(nombre: string, apellidos: string, email: string) {
    const revisor = this.revisores.create({ nombre, apellidos, email });
    return this.revisores.save(revisor);
  }

  listarRevisoresRepository() {
    return this.revisores.find({ order: { id: 'ASC' } });
  }
}

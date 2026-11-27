import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profesional } from './entities/profesional.entity';

@Injectable()
export class ProfesionalesService {
  constructor(
    @InjectRepository(Profesional) private readonly profesionales: Repository<Profesional>
  ) {}

  crearProfesional(nombre: string, apellidos: string, email: string) {
    const profesional = this.profesionales.create({ nombre, apellidos, email });
    return this.profesionales.save(profesional);
  }

  listarProfesionales() {
    return this.profesionales.find({ order: { id: 'ASC' } });
  }
}

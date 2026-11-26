import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instructor } from '../entities/instructor.entity';

@Injectable()
export class InstructoresRepository {
  constructor(
    @InjectRepository(Instructor) private readonly instructores: Repository<Instructor>
  ) {}

  crearInstructorRepository(nombre: string, apellidos: string, email: string) {
    const instructor = this.instructores.create({ nombre, apellidos, email });
    return this.instructores.save(instructor);
  }

  listarInstructoresRepository() {
    return this.instructores.find({ order: { id: 'ASC' } });
  }
}

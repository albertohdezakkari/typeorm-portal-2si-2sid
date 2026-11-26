import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programa } from '../entities/programa.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Programa) private readonly programas: Repository<Programa>
  ) {}

  crearProgramaRepository(nombre: string, duracionMinutos: number, emisoraId: number) {
    const programa = this.programas.create({
      nombre, duracionMinutos, emisora: { id: emisoraId }
    });
    return this.programas.save(programa);
  }

  listarProgramasRepository() {
    return this.programas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

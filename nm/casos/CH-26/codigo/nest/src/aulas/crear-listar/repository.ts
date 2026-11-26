import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aula } from '../entities/aula.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>
  ) {}

  crearAulaRepository(nombre: string, capacidad: number, escuelaId: number) {
    const aula = this.aulas.create({
      nombre, capacidad, escuela: { id: escuelaId }
    });
    return this.aulas.save(aula);
  }

  listarAulasRepository() {
    return this.aulas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Aula } from './entities/aula.entity';
import { Escuela } from '../escuelas/entities/escuela.entity';

@Injectable()
export class AulasService {
  constructor(
    @InjectRepository(Aula) private readonly aulas: Repository<Aula>,
    @InjectRepository(Escuela) private readonly escuelas: Repository<Escuela>
  ) {}

  crearAula(nombre: string, capacidad: number, escuelaId: number) {
    const aula = this.aulas.create({
      nombre,
      capacidad,
      escuela: { id: escuelaId }
    });
    return this.aulas.save(aula);
  }

  listarAulas() {
    return this.aulas.find({ relations: { escuela: true }, order: { id: 'ASC' } });
  }

  async eliminarAula(aulaId: number) {
    await this.aulas.delete(aulaId);
  }

  async modificarCapacidad(aulaId: number, capacidad: number) {
    await this.aulas.update(aulaId, { capacidad });
    return this.aulas.findOneBy({ id: aulaId });
  }

  async cambiarEscuela(aulaId: number, escuelaId: number) {
    await this.aulas.update(aulaId, { escuela: { id: escuelaId } });
    return this.aulas.findOneBy({ id: aulaId });
  }

  async consultarEscuela(escuelaId: number, minimo: number) {
    const escuela = await this.escuelas.findOneBy({ id: escuelaId });
    const aulas = await this.aulas.find({
      where: {
        escuela: { id: escuelaId },
        capacidad: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { escuela, aulas };
  }
}

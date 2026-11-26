import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Excursion } from '../entities/excursion.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Excursion) private readonly excursiones: Repository<Excursion>
  ) {}

  crearExcursionRepository(nombre: string, duracionHoras: number, agenciaId: number) {
    const excursion = this.excursiones.create({
      nombre, duracionHoras, agencia: { id: agenciaId }
    });
    return this.excursiones.save(excursion);
  }

  listarExcursionesRepository() {
    return this.excursiones.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

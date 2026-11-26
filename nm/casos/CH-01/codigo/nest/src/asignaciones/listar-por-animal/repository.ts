import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asignacion } from '../entities/asignacion.entity';

@Injectable()
export class ListarPorAnimalRepository {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>
  ) {}

  listarAsignacionesPorAnimalRepository(animalId: number) {
    return this.asignaciones.find({
      where: { animalId },
      order: { cuidadorId: 'ASC' }
    });
  }
}

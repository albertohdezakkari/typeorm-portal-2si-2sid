import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laboratorio } from './entities/laboratorio.entity';

@Injectable()
export class LaboratoriosService {
  constructor(
    @InjectRepository(Laboratorio) private readonly laboratorios: Repository<Laboratorio>
  ) {}

  crearLaboratorio(nombre: string) {
    const laboratorio = this.laboratorios.create({ nombre });
    return this.laboratorios.save(laboratorio);
  }

  listarLaboratorios() {
    return this.laboratorios.find({ order: { id: 'ASC' } });
  }
}
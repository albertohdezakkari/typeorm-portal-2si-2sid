import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inspector } from './entities/inspector.entity';

@Injectable()
export class InspectoresService {
  constructor(
    @InjectRepository(Inspector) private readonly inspectores: Repository<Inspector>
  ) {}

  crearInspector(nombre: string, apellidos: string, email: string) {
    const inspector = this.inspectores.create({ nombre, apellidos, email });
    return this.inspectores.save(inspector);
  }

  listarInspectores() {
    return this.inspectores.find({ order: { id: 'ASC' } });
  }
}

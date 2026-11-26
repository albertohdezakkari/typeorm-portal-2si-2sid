import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conductor } from '../entities/conductor.entity';

@Injectable()
export class ConductoresRepository {
  constructor(
    @InjectRepository(Conductor) private readonly conductores: Repository<Conductor>
  ) {}

  crearConductorRepository(nombre: string, apellidos: string, email: string) {
    const conductor = this.conductores.create({ nombre, apellidos, email });
    return this.conductores.save(conductor);
  }

  listarConductoresRepository() {
    return this.conductores.find({ order: { id: 'ASC' } });
  }
}

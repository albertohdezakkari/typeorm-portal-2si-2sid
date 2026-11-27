import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mecanico } from './entities/mecanico.entity';

@Injectable()
export class MecanicosService {
  constructor(
    @InjectRepository(Mecanico) private readonly mecanicos: Repository<Mecanico>
  ) {}

  crearMecanico(nombre: string, apellidos: string, email: string) {
    const mecanico = this.mecanicos.create({ nombre, apellidos, email });
    return this.mecanicos.save(mecanico);
  }

  listarMecanicos() {
    return this.mecanicos.find({ order: { id: 'ASC' } });
  }
}

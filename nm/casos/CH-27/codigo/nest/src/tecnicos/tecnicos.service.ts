import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from './entities/tecnico.entity';

@Injectable()
export class TecnicosService {
  constructor(
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  crearTecnico(nombre: string, apellidos: string, email: string) {
    const tecnico = this.tecnicos.create({ nombre, apellidos, email });
    return this.tecnicos.save(tecnico);
  }

  listarTecnicos() {
    return this.tecnicos.find({ order: { id: 'ASC' } });
  }
}

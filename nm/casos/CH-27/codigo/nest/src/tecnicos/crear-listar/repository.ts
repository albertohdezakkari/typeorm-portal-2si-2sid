import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tecnico } from '../entities/tecnico.entity';

@Injectable()
export class TecnicosRepository {
  constructor(
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  crearTecnicoRepository(nombre: string, apellidos: string, email: string) {
    const tecnico = this.tecnicos.create({ nombre, apellidos, email });
    return this.tecnicos.save(tecnico);
  }

  listarTecnicosRepository() {
    return this.tecnicos.find({ order: { id: 'ASC' } });
  }
}

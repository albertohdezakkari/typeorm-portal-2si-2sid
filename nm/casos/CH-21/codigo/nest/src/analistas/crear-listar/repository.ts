import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analista } from '../entities/analista.entity';

@Injectable()
export class AnalistasRepository {
  constructor(
    @InjectRepository(Analista) private readonly analistas: Repository<Analista>
  ) {}

  crearAnalistaRepository(nombre: string, apellidos: string, email: string) {
    const analista = this.analistas.create({ nombre, apellidos, email });
    return this.analistas.save(analista);
  }

  listarAnalistasRepository() {
    return this.analistas.find({ order: { id: 'ASC' } });
  }
}

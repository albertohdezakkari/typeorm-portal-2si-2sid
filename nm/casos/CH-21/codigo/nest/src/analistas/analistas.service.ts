import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Analista } from './entities/analista.entity';

@Injectable()
export class AnalistasService {
  constructor(
    @InjectRepository(Analista) private readonly analistas: Repository<Analista>
  ) {}

  crearAnalista(nombre: string, apellidos: string, email: string) {
    const analista = this.analistas.create({ nombre, apellidos, email });
    return this.analistas.save(analista);
  }

  listarAnalistas() {
    return this.analistas.find({ order: { id: 'ASC' } });
  }
}

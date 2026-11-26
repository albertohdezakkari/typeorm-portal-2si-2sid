import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agricultor } from '../entities/agricultor.entity';

@Injectable()
export class AgricultoresRepository {
  constructor(
    @InjectRepository(Agricultor) private readonly agricultores: Repository<Agricultor>
  ) {}

  crearAgricultorRepository(nombre: string, apellidos: string, email: string) {
    const agricultor = this.agricultores.create({ nombre, apellidos, email });
    return this.agricultores.save(agricultor);
  }

  listarAgricultoresRepository() {
    return this.agricultores.find({ order: { id: 'ASC' } });
  }
}

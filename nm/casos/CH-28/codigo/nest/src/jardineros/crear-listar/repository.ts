import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jardinero } from '../entities/jardinero.entity';

@Injectable()
export class JardinerosRepository {
  constructor(
    @InjectRepository(Jardinero) private readonly jardineros: Repository<Jardinero>
  ) {}

  crearJardineroRepository(nombre: string, apellidos: string, email: string) {
    const jardinero = this.jardineros.create({ nombre, apellidos, email });
    return this.jardineros.save(jardinero);
  }

  listarJardinerosRepository() {
    return this.jardineros.find({ order: { id: 'ASC' } });
  }
}

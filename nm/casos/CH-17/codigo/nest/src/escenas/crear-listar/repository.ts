import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Escena } from '../entities/escena.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Escena) private readonly escenas: Repository<Escena>
  ) {}

  crearEscenaRepository(nombre: string, duracionSegundos: number, estudioId: number) {
    const escena = this.escenas.create({
      nombre, duracionSegundos, estudio: { id: estudioId }
    });
    return this.escenas.save(escena);
  }

  listarEscenasRepository() {
    return this.escenas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

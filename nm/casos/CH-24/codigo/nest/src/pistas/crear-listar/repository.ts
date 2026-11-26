import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pista } from '../entities/pista.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Pista) private readonly pistas: Repository<Pista>
  ) {}

  crearPistaRepository(nombre: string, superficieM2: number, complejoId: number) {
    const pista = this.pistas.create({
      nombre, superficieM2, complejo: { id: complejoId }
    });
    return this.pistas.save(pista);
  }

  listarPistasRepository() {
    return this.pistas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

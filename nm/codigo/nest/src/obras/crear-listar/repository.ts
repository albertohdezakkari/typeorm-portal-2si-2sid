import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Obra } from '../entities/obra.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Obra) private readonly obras: Repository<Obra>
  ) {}

  crearObraRepository(nombre: string, presupuestoEuros: number, ayuntamientoId: number) {
    const obra = this.obras.create({
      nombre, presupuestoEuros, ayuntamiento: { id: ayuntamientoId }
    });
    return this.obras.save(obra);
  }

  listarObrasRepository() {
    return this.obras.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

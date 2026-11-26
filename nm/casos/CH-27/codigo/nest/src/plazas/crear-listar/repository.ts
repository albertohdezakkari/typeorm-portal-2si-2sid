import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plaza } from '../entities/plaza.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>
  ) {}

  crearPlazaRepository(nombre: string, superficieM2: number, urbanizacionId: number) {
    const plaza = this.plazas.create({
      nombre, superficieM2, urbanizacion: { id: urbanizacionId }
    });
    return this.plazas.save(plaza);
  }

  listarPlazasRepository() {
    return this.plazas.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from '../entities/proyecto.entity';

@Injectable()
export class CrearListarRepository {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>
  ) {}

  crearProyectoRepository(nombre: string, horasEstimadas: number, empresaId: number) {
    const proyecto = this.proyectos.create({
      nombre, horasEstimadas, empresa: { id: empresaId }
    });
    return this.proyectos.save(proyecto);
  }

  listarProyectosRepository() {
    return this.proyectos.createQueryBuilder('p')
      .orderBy('p.id', 'ASC').getMany();
  }
}

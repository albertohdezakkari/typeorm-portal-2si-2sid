import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Empresa } from '../empresas/entities/empresa.entity';

@Injectable()
export class ProyectosService {
  constructor(
    @InjectRepository(Proyecto) private readonly proyectos: Repository<Proyecto>,
    @InjectRepository(Empresa) private readonly empresas: Repository<Empresa>
  ) {}

  crearProyecto(nombre: string, horasEstimadas: number, empresaId: number) {
    const proyecto = this.proyectos.create({
      nombre,
      horasEstimadas,
      empresa: { id: empresaId }
    });
    return this.proyectos.save(proyecto);
  }

  listarProyectos() {
    return this.proyectos.find({ relations: { empresa: true }, order: { id: 'ASC' } });
  }

  async eliminarProyecto(proyectoId: number) {
    await this.proyectos.delete(proyectoId);
  }

  async modificarHorasEstimadas(proyectoId: number, horasEstimadas: number) {
    await this.proyectos.update(proyectoId, { horasEstimadas });
    return this.proyectos.findOneBy({ id: proyectoId });
  }

  async cambiarEmpresa(proyectoId: number, empresaId: number) {
    await this.proyectos.update(proyectoId, { empresa: { id: empresaId } });
    return this.proyectos.findOneBy({ id: proyectoId });
  }

  async consultarEmpresa(empresaId: number, minimo: number) {
    const empresa = await this.empresas.findOneBy({ id: empresaId });
    const proyectos = await this.proyectos.find({
      where: {
        empresa: { id: empresaId },
        horasEstimadas: MoreThanOrEqual(minimo)
      },
      order: { id: 'ASC' }
    });
    return { empresa, proyectos };
  }
}

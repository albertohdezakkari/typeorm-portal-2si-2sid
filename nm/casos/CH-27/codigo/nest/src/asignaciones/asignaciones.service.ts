import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Plaza } from '../plazas/entities/plaza.entity';
import { Tecnico } from '../tecnicos/entities/tecnico.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Plaza) private readonly plazas: Repository<Plaza>,
    @InjectRepository(Tecnico) private readonly tecnicos: Repository<Tecnico>
  ) {}

  async asignarTecnico(plazaId: number, tecnicoId: number, rol: string) {
    const plaza = await this.plazas.findOneBy({ id: plazaId });
    const tecnico = await this.tecnicos.findOneBy({ id: tecnicoId });
    if (!plaza || !tecnico) {
      throw new NotFoundException('No existe la plaza o el tecnico');
    }
    const asignacion = { plazaId, tecnicoId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El tecnico ya está asignado a esa plaza');
      }
      throw error;
    }
  }

  listarPorPlaza(plazaId: number) {
    return this.asignaciones.find({ where: { plazaId }, order: { tecnicoId: 'ASC' } });
  }

  listarPorTecnico(tecnicoId: number) {
    return this.asignaciones.find({ where: { tecnicoId }, order: { plazaId: 'ASC' } });
  }

  async modificarRol(plazaId: number, tecnicoId: number, rol: string) {
    const resultado = await this.asignaciones.update({ plazaId, tecnicoId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { plazaId, tecnicoId, rol };
  }

  async eliminarAsignacion(plazaId: number, tecnicoId: number) {
    await this.asignaciones.delete({ plazaId, tecnicoId });
  }
}

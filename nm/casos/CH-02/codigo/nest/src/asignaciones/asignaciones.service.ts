import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Parcela } from '../parcelas/entities/parcela.entity';
import { Cultivador } from '../cultivadores/entities/cultivador.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Parcela) private readonly parcelas: Repository<Parcela>,
    @InjectRepository(Cultivador) private readonly cultivadores: Repository<Cultivador>
  ) {}

  crearCultivador(nombre: string, apellidos: string, email: string) {
    const cultivador = this.cultivadores.create({ nombre, apellidos, email });
    return this.cultivadores.save(cultivador);
  }

  listarCultivadores() {
    return this.cultivadores.find({ order: { id: 'ASC' } });
  }

  async asignarCultivador(parcelaId: number, cultivadorId: number, rol: string) {
    const parcela = await this.parcelas.findOneBy({ id: parcelaId });
    const cultivador = await this.cultivadores.findOneBy({ id: cultivadorId });
    if (!parcela || !cultivador) {
      throw new NotFoundException('No existe la parcela o el cultivador');
    }
    const asignacion = { parcelaId, cultivadorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cultivador ya está asignado a esa parcela');
      }
      throw error;
    }
  }

  listarPorParcela(parcelaId: number) {
    return this.asignaciones.find({ where: { parcelaId }, order: { cultivadorId: 'ASC' } });
  }

  listarPorCultivador(cultivadorId: number) {
    return this.asignaciones.find({ where: { cultivadorId }, order: { parcelaId: 'ASC' } });
  }

  async modificarRol(parcelaId: number, cultivadorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ parcelaId, cultivadorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { parcelaId, cultivadorId, rol };
  }

  async eliminarAsignacion(parcelaId: number, cultivadorId: number) {
    await this.asignaciones.delete({ parcelaId, cultivadorId });
  }
}

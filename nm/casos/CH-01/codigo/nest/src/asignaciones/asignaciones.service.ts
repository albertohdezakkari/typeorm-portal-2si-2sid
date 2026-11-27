import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Asignacion } from './entities/asignacion.entity';
import { Animal } from '../animales/entities/animal.entity';
import { Cuidador } from '../cuidadores/entities/cuidador.entity';

@Injectable()
export class AsignacionesService {
  constructor(
    @InjectRepository(Asignacion) private readonly asignaciones: Repository<Asignacion>,
    @InjectRepository(Animal) private readonly animales: Repository<Animal>,
    @InjectRepository(Cuidador) private readonly cuidadores: Repository<Cuidador>
  ) {}

  async asignarCuidador(animalId: number, cuidadorId: number, rol: string) {
    const animal = await this.animales.findOneBy({ id: animalId });
    const cuidador = await this.cuidadores.findOneBy({ id: cuidadorId });
    if (!animal || !cuidador) {
      throw new NotFoundException('No existe el animal o el cuidador');
    }
    const asignacion = { animalId, cuidadorId, rol };
    try {
      await this.asignaciones.insert(asignacion);
      return asignacion;
    } catch (error) {
      if (error instanceof QueryFailedError && error.driverError.code === '23505') {
        throw new ConflictException('El cuidador ya está asignado a ese animal');
      }
      throw error;
    }
  }

  listarPorAnimal(animalId: number) {
    return this.asignaciones.find({ where: { animalId }, order: { cuidadorId: 'ASC' } });
  }

  listarPorCuidador(cuidadorId: number) {
    return this.asignaciones.find({ where: { cuidadorId }, order: { animalId: 'ASC' } });
  }

  async modificarRol(animalId: number, cuidadorId: number, rol: string) {
    const resultado = await this.asignaciones.update({ animalId, cuidadorId }, { rol });
    if (!resultado.affected) throw new NotFoundException('No existe la asignación');
    return { animalId, cuidadorId, rol };
  }

  async eliminarAsignacion(animalId: number, cuidadorId: number) {
    await this.asignaciones.delete({ animalId, cuidadorId });
  }
}

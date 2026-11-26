import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Habitacion } from '../../habitaciones/entities/habitacion.entity';
import { Hospital } from '../entities/hospital.entity';

@Injectable()
export class ConsultarHospitalRepository {
  constructor(
    @InjectRepository(Habitacion) private readonly habitaciones: Repository<Habitacion>,
    @InjectRepository(Hospital) private readonly hospitales: Repository<Hospital>
  ) {}

  async consultarHospitalRepository(hospitalId: number, minimo: number) {
    const hospital = await this.hospitales.createQueryBuilder('h')
      .where('h.id = :hospitalId', { hospitalId }).getOne();
    const habitaciones = await this.habitaciones.createQueryBuilder('p')
      .innerJoin('p.hospital', 'h')
      .where('h.id = :hospitalId', { hospitalId })
      .andWhere('p.camas >= :minimo', { minimo })
      .orderBy('p.id', 'ASC').getMany();
    return { hospital, habitaciones };
  }
}

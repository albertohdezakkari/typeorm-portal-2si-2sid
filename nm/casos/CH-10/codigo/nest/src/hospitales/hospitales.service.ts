import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';

@Injectable()
export class HospitalesService {
  constructor(
    @InjectRepository(Hospital) private readonly hospitales: Repository<Hospital>
  ) {}

  crearHospital(nombre: string) {
    const hospital = this.hospitales.create({ nombre });
    return this.hospitales.save(hospital);
  }

  listarHospitales() {
    return this.hospitales.find({ order: { id: 'ASC' } });
  }
}
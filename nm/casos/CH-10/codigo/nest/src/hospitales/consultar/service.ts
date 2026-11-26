import { Injectable } from '@nestjs/common';
import { ConsultarHospitalRepository } from './repository';

@Injectable()
export class ConsultarHospitalService {
  constructor(private readonly repository: ConsultarHospitalRepository) {}

  consultarHospitalService(hospitalId: number, minimo: number) {
    return this.repository.consultarHospitalRepository(hospitalId, minimo);
  }
}

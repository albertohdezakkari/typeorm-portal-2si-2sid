import { Injectable } from '@nestjs/common';
import { ListarPorHuespedRepository } from './repository';

@Injectable()
export class ListarPorHuespedService {
  constructor(private readonly repository: ListarPorHuespedRepository) {}

  listarAsignacionesPorHuespedService(huespedId: number) {
    return this.repository.listarAsignacionesPorHuespedRepository(huespedId);
  }
}

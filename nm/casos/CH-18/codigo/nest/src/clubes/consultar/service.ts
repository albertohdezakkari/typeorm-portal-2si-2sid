import { Injectable } from '@nestjs/common';
import { ConsultarClubRepository } from './repository';

@Injectable()
export class ConsultarClubService {
  constructor(private readonly repository: ConsultarClubRepository) {}

  consultarClubService(clubId: number, minimo: number) {
    return this.repository.consultarClubRepository(clubId, minimo);
  }
}

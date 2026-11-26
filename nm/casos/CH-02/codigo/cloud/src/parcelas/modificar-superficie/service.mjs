import { modificarSuperficieRepository } from './repository.mjs';

export function modificarSuperficieService(parcelaId, superficieM2) {
  return modificarSuperficieRepository(parcelaId, superficieM2);
}

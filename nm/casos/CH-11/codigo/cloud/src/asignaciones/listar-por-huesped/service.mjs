import { listarAsignacionesPorHuespedRepository } from './repository.mjs';

export function listarAsignacionesPorHuespedService(huespedId) {
  return listarAsignacionesPorHuespedRepository(huespedId);
}

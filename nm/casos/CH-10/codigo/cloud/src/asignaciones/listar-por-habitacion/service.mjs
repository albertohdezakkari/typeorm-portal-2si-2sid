import { listarAsignacionesPorHabitacionRepository } from './repository.mjs';

export function listarAsignacionesPorHabitacionService(habitacionId) {
  return listarAsignacionesPorHabitacionRepository(habitacionId);
}

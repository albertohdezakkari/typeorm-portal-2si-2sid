import { crearHabitacionRepository, listarHabitacionesRepository } from './repository.mjs';

export async function crearHabitacionService(nombre, camas, hospitalId) {
  const habitacionId = Date.now();
  const habitacion = { habitacionId, nombre, camas, hospitalId };
  await crearHabitacionRepository(habitacion);
  return habitacion;
}

export function listarHabitacionesService() {
  return listarHabitacionesRepository();
}

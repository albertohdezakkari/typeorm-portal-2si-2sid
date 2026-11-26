import { eliminarHabitacionRepository } from './repository.mjs';

export async function eliminarHabitacionService(habitacionId) {
  await eliminarHabitacionRepository(habitacionId);
}
